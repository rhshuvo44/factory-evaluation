import { Form, Input } from "antd";
import { TInput } from "../../types/customInputTypes";

const CustomTextArea = ({ name, label, message }: TInput) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: message }]}
    >
      <Input.TextArea />
    </Form.Item>
  );
};

export default CustomTextArea;
