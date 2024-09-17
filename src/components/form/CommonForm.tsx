import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { TTravel } from "../../types/tableType";

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

const CommonForm = () => {
  const onFinish = (values: TTravel) => {
    console.log("Received values of form: ", values);
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        label="SL No"
        name="slNo"
        rules={[{ required: true, message: "Please input SL No" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Particulars"
        name="particulars"
        rules={[{ required: true, message: "Please input! Particulars" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input! Description" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Remark"
        name="remark"
        rules={[{ required: true, message: "Please input! Remark" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Buyer ID"
        name="buyerId"
        rules={[{ required: true, message: "Please input! Buyer ID" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Order No"
        name="orderNo"
        rules={[{ required: true, message: "Please input! Order No" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Pay to"
        name="payTo"
        rules={[{ required: true, message: "Please input! Pay to" }]}
      >
        <Input />
      </Form.Item>
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

      <Form.Item
        label="Unit"
        name="unit"
        rules={[{ required: true, message: "Please input! Unit" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Unit Price"
        name="unitPrice"
        rules={[{ required: true, message: "Please input! Unit Price" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Total Price"
        name="totalPrice"
        rules={[{ required: true, message: "Please input! Total Price" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommonForm;
