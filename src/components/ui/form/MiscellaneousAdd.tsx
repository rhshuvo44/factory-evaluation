import { Button, DatePicker, Form, Select } from "antd";
import { TMiscellaneous } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import CustomTextArea from "../../form/CustomTextArea";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const MiscellaneousAdd = () => {
  const onFinish = (values: TMiscellaneous) => {
    console.log("Received values of form: ", values);
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
        label="Remark"
        name="remark"
        message="Please input! Remark"
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
        <DatePicker style={{ width: "100%" }} />
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

export default MiscellaneousAdd;
