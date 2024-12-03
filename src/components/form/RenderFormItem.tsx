import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const RenderFormItem = (field: any) => {
  switch (field.type) {
    case "Select":
      return (
        <Form.Item
          label={field.label}
          name={field.name}
          rules={[{ required: true, message: `${field.label} is required` }]}
        >
          <Select {...field.props} style={{ width: "100%" }} />
        </Form.Item>
      );
    case "TextArea":
      return (
        <Form.Item
          label={field.label}
          name={field.name}
          rules={[{ required: true, message: `${field.label} is required` }]}
        >
          <TextArea {...field.props} style={{ width: "100%" }} />
        </Form.Item>
      );
    case "InputNumber":
      return (
        <Form.Item
          label={field.label}
          name={field.name}
          rules={[{ required: true, message: `${field.label} is required` }]}
        >
          <InputNumber min={0} {...field.props} style={{ width: "100%" }} />
        </Form.Item>
      );
    case "Input":
      return (
        <Form.Item
          label={field.label}
          name={field.name}
          rules={[{ required: true, message: `${field.label} is required` }]}
        >
          <Input {...field.props} style={{ width: "100%" }} />
        </Form.Item>
      );
    case "DatePicker":
      return (
        <Form.Item
          label={field.label}
          name={field.name}
          rules={[{ required: true, message: `${field.label} is required` }]}
        >
          <DatePicker {...field.props} style={{ width: "100%" }} />
        </Form.Item>
      );
    default:
      return null;
  }
};

export default RenderFormItem;
