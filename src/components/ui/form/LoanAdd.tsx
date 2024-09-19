import { Button, DatePicker, DatePickerProps, Form, Select } from "antd";
import { paymentOptions } from "../../../constants/dropdownoptions";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TLoan } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import CustomTextArea from "../../form/CustomTextArea";

const LoanAdd = () => {
  let date: string;
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    date = dateString as string;
  };
  const onFinish = (values: TLoan) => {
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
      <CustomInput
        label="Orderer By"
        name="ordererBy"
        message="Please input! Orderer By"
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

export default LoanAdd;
