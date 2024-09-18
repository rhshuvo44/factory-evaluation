import { Button, DatePicker, DatePickerProps, Form, Select } from "antd";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TBuyer } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import CustomTextArea from "../../form/CustomTextArea";

const BuyerDevelopmentAdd = () => {
  let date: any;
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    date = dateString;
  };
  const onFinish = (values: TBuyer) => {
    console.log("Received values of form: ", { ...values, date });
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish}>
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
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "day", label: "Day" },
            { value: "once", label: "Once" },
          ]}
        />
      </Form.Item>
      <CustomInputNumber
        label="Unit"
        name="unit"
        message="Please input! Unit"
      />
      <CustomInputNumber
        label="Unit Price"
        name="unitPrice"
        message="Please input! Unit Price"
      />
      <CustomInputNumber
        label="Total Price"
        name="totalPrice"
        message="Please input! Total Price"
      />

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BuyerDevelopmentAdd;
