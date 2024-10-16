import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  InputNumberProps,
  Select,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateLoanMutation } from "../../../redux/features/loan/loanApi";
import { TLoan } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import CustomTextArea from "../../form/CustomTextArea";

const LoanAdd = () => {
  const [form] = Form.useForm();
  const [unit, setUnit] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");
  const [createLoanMutation] = useCreateLoanMutation();
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };
  const onChangeUnit: InputNumberProps["onChange"] = (values) => {
    setUnit(values as number);
  };
  const onChangeUnitPrice: InputNumberProps["onChange"] = (values) => {
    setUnitPrice(values as number);
  };
  const disableDates = (current: Dayjs) => {
    // Disable dates that are more than 45 days ago or in the future

    return (
      current.isBefore(dayjs().subtract(45, "day")) || current.isAfter(dayjs())
    );
  };
  useEffect(() => {
    form.setFieldsValue({
      totalPrice: unit * unitPrice,
    });
  }, [unit, unitPrice, form]);
  const onFinish = async (values: TLoan) => {
    console.log("Received values of form: ", { ...values, date });

    const res = await createLoanMutation({
      ...values,
      date,
    }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success(res.message);
    form.resetFields();
  };

  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <CustomInput
        label="Particulars"
        name="particulars"
        message="Please input! Particulars"
        placeholder="please input particular text"
      />
      <CustomTextArea
        label="Description"
        name="description"
        message="Please input! Description"
        placeholder="please input Description"
      />
      <CustomInputNumber
        label="Quantity"
        name="quantity"
        message="Please input! Quantity"
        placeholder="please input Quantity number"
      />
      <CustomInputNumber
        label="Memo No"
        name="memoNo"
        message="Please input! Memo No"
        placeholder="please input memo number"
      />
      <Form.Item
        label="Ordered By"
        name="orderedBy"
        rules={[{ required: true, message: "Please select Ordered By! " }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Please select Ordered By"
          options={[
            { value: "M.D", label: "M.D" },
            { value: "Chairman", label: "Chairman" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Pay to"
        name="payTo"
        rules={[{ required: true, message: "Please select Pay to! " }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Please select Pay to"
          options={[
            { value: "Sarkar Alliance OPC", label: "Sarkar Alliance Opc" },
            { value: "M.D", label: "M.D" },
            { value: "Chairman", label: "Chairman" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input! Date" }]}
      >
        <DatePicker
          onChange={onChangeDate}
          style={{ width: "100%" }}
          disabledDate={disableDates}
        />
      </Form.Item>

      <Form.Item
        label="Payment Type"
        name="paymentType"
        rules={[{ required: true, message: "Please select Payment type! " }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Please select Payment Type"
          options={[
            { value: "Bank", label: "Bank" },
            { value: "Cash", label: "Cash" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Unit"
        name="unit"
        rules={[{ required: true, message: "Please Input Unit! " }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeUnit}
          placeholder="please input unit number"
        />
      </Form.Item>

      <Form.Item
        label="Unit Price"
        name="unitPrice"
        rules={[{ required: true, message: "Please Input Unit Price! " }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeUnitPrice}
          placeholder="please input unit price"
        />
      </Form.Item>

      <Form.Item label="Total Price" name="totalPrice">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoanAdd;
