import { Form, InputNumber } from "antd";
import { TInput } from "../../types/customInputTypes";

const CustomInputNumber = ({ name, label, message, placeholder }: TInput) => {
  return (
    <Form.Item
      label={label}
       validateTrigger="onBlur"
      name={name}
      rules={[{ required: true, message: message }]}
    >
      <InputNumber
        style={{ width: "100%" }}
        min={0}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default CustomInputNumber;
