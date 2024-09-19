import { Form, InputNumber } from "antd";
import { TInput } from "../../types/customInputTypes";

const CustomInputNumber = ({ name, label, message }: TInput) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: message }]}
    >
      <InputNumber style={{ width: "100%" }} min={0} />
    </Form.Item>
  );
};

export default CustomInputNumber;
