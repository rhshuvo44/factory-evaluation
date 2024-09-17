import { Button, Form, InputNumber } from "antd";
import { TUtility } from "../../../types/tableType";
import CustomInputNumber from "../../form/CustomInputNumber";
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
const UtilityAddForm = () => {
  const onFinish = (values: TUtility) => {
    console.log("Received values of form: ", values);
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish}>
      <CustomInputNumber
        label="Internet"
        name="internet"
        message="Please input Internet Bill"
      />
      <CustomInputNumber
        label="Water"
        name="water"
        message="Please input Water bill"
      />
      <CustomInputNumber
        label="Electricity"
        name="electricity"
        message="Please input Electricity bill"
      />

      <Form.Item
        label="Others"
        name="others"
        rules={[{ required: false, message: "Please input Others Bill" }]}
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

export default UtilityAddForm;
