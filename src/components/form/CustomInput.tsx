import { Form, Input } from "antd";
import { TInput } from "../../types/customInputTypes";

const CustomInput = ({ name, label, message, placeholder }: TInput) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: message }]}
    >
      <Input style={{ width: "100%" }} placeholder={placeholder} />
    </Form.Item>
  );
};

export default CustomInput;
