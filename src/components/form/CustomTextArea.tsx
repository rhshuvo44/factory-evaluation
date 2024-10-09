import { Form, Input } from "antd";
import { TInput } from "../../types/customInputTypes";

const CustomTextArea = ({ name, label, message, placeholder }: TInput) => {
  return (
    <Form.Item
      validateTrigger="onBlur"
      label={label}
      name={name}
      rules={[{ required: true, message: message }]}
    >
      <Input.TextArea placeholder={placeholder} />
    </Form.Item>
  );
};

export default CustomTextArea;
