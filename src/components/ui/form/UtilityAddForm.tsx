import { Button, Form, InputNumber } from "antd";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TSubUtility, TUtility } from "../../../types/tableType";
import CustomInputNumber from "../../form/CustomInputNumber";

const UtilityAddForm = () => {
  const onFinish = (values: TUtility) => {
    console.log("Received values of form: ", values);
    const { electricity, internet, water, others } = values;
    const internetBill: TSubUtility = {
      unitPrice: typeof internet === "number" ? internet / 30 : 0,
      totalPrice: typeof internet === "number" ? internet : 0,
    };
    const waterBill: TSubUtility = {
      unitPrice: typeof water === "number" ? water / 30 : 0,
      totalPrice: typeof water === "number" ? water : 0,
    };
    const electricityBill: TSubUtility = {
      unitPrice: typeof electricity === "number" ? electricity / 30 : 0,
      totalPrice: typeof electricity === "number" ? electricity : 0,
    };
    const othersBill: TSubUtility = {
      unitPrice: typeof others === "number" ? others / 30 : 0,
      totalPrice: typeof others === "number" ? others : 0,
    };
    const utility = {
      internet: internetBill,
      water: waterBill,
      electricity: electricityBill,
      others: othersBill,
    };
    console.log(utility);
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
