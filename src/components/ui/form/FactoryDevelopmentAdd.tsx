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
import { useCreateFactoryDevelopMutation } from "../../../redux/features/Factory development/factoryDevelopmentApi";
import { TFactory } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import CustomTextArea from "../../form/CustomTextArea";
import { paymentOptions } from "../../../constants/Options";
const FactoryDevelopmentAdd = () => {
  const [form] = Form.useForm();
  const [unit, setUnit] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");
  const [createFactoryDevelop] = useCreateFactoryDevelopMutation();
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
  const onFinish = async (values: TFactory) => {
    const res = await createFactoryDevelop({ ...values, date }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Factory Development successfully");
    form.resetFields();
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <CustomInput
        label="Particulars"
        name="particulars"
        message="Please input! Particulars"
        placeholder="please input particulars text"
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
        placeholder="please input Quantity Number"
      />
      <CustomInputNumber
        label="Memo No"
        name="memoNo"
        message="Please input! Memo No"
        placeholder="please input Memo number"
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
      <CustomInput
        label="Pay to"
        name="payTo"
        message="Please input! Pay to"
        placeholder="please input pay to name"
      />

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
          options={paymentOptions}
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

export default FactoryDevelopmentAdd;
