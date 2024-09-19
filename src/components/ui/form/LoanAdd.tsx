import { Button, DatePicker, DatePickerProps, Form, InputNumber, InputNumberProps, Select } from "antd";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TLoan } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import CustomTextArea from "../../form/CustomTextArea";
import { useEffect, useState } from "react";

const LoanAdd = () => {
  const [form] = Form.useForm();
  const [unit, setUnit] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");

  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };
  const onChangeUnit: InputNumberProps["onChange"] = (values) => {
    setUnit(values as number);
  };
  const onChangeUnitPrice: InputNumberProps["onChange"] = (values) => {
    setUnitPrice(values as number);
  };
  useEffect(() => {
    form.setFieldsValue({
      totalPrice: unit * unitPrice,
    });
  }, [unit, unitPrice, form]);
  const onFinish = (values: TLoan) => {
    console.log("Received values of form: ", { ...values, date });
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };

  // orderedBy: "M.D" | "Chairman";
  //   payTo: "sarkar alliance plc" | "chairman" | "M.D";

  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <CustomInputNumber
        label="SL No"
        name="slNo"
        message="Please input SL No"
      />

      <CustomInput
        label="Particulars"
        name="particulars"
        message="Please input! Particulars"
      />
      <CustomTextArea
        label="Description"
        name="description"
        message="Please input! Description"
      />
      <CustomInput
        label="Quantity"
        name="quantity"
        message="Please input! Quantity"
      />
      <CustomInput
        label="Memo No"
        name="memoNo"
        message="Please input! Memo No"
      />
      <Form.Item
        label="Ordered By"
        name="OrderedBy"
        rules={[{ required: true, message: "Please select Ordered By! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select Ordered By"
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
          defaultValue="Please select Pay to"
          options={[
            { value: "sarkar alliance opc", label: "Sarkar Alliance Opc" },
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
        <DatePicker onChange={onChangeDate} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Payment Type"
        name="paymentType"
        rules={[{ required: true, message: "Please select Payment type! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select payment type"
          options={[
            { value: "bank", label: "Bank" },
            { value: "cash", label: "Cash" },
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
