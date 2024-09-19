import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  Select,
} from "antd";
import { useState } from "react";
import {
  buyerParticularsOptions,
  paymentOptions,
} from "../../../constants/dropdownoptions";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TBuyer } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import CustomTextArea from "../../form/CustomTextArea";

const BuyerDevelopmentAdd = () => {
  const [form] = Form.useForm();
  const [unit, setUnit] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  let date: string;
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    date = dateString as string;
    console.log("inside date: " + date);
  };
  // console.log("outside date: " + date);

  const onChangeUnit = (values: any) => {
    setUnit(values);
  };
  const onChangeUnitPrice = (values: any) => {
    setUnitPrice(values);
  };
  form.setFieldsValue({
    totalPrice: unit * unitPrice,
  });
  const onFinish = (values: TBuyer) => {
    console.log("Received values of form: ", { ...values, date });
    console.log(date);
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <CustomInputNumber
        label="SL No"
        name="slNo"
        message="Please input SL No"
      />

      <Form.Item
        label="Particulars"
        name="particulars"
        rules={[{ required: true, message: "Please select Particulars! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select Particular"
          options={buyerParticularsOptions}
        />
      </Form.Item>
      <CustomTextArea
        label="Description"
        name="description"
        message="Please input! Description"
      />
      <CustomInputNumber
        label="Quantity"
        name="quantity"
        message="Please input! Quantity"
      />
      <CustomInput
        label="Buyer ID"
        name="buyerId"
        message="Please input! Buyer ID"
      />
      <CustomInput
        label="Order No"
        name="orderNo"
        message="Please input! Order No"
      />
      <CustomInput label="Pay to" name="payTo" message="Please input! Pay to" />

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
          defaultValue="monthly"
          options={paymentOptions}
        />
      </Form.Item>
      <Form.Item label="Unit" name="unit">
        <InputNumber style={{ width: "100%" }} onChange={onChangeUnit} />
      </Form.Item>

      <Form.Item label="Unit Price" name="unitPrice">
        <InputNumber style={{ width: "100%" }} onChange={onChangeUnitPrice} />
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

export default BuyerDevelopmentAdd;
