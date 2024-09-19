import { Button, Form, Input, Select } from "antd";
import { userRoleOptions } from "../../../constants/dropdownoptions";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TUSer } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomTextArea from "../../form/CustomTextArea";

const UserForm = () => {
  const onFinish = (values: TUSer) => {
    console.log("Received values of form: ", values);
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish}>
      <CustomInput label="Name" name="name" message="Please input Name" />
      <CustomInput
        label="Username"
        name="username"
        message="Please input Username"
      />
      <CustomInput label="Email" name="email" message="Please input Email" />

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input Password" }]}
      >
        <Input.Password style={{ width: "100%" }} />
      </Form.Item>

      <CustomInput label="Phone" name="phone" message="Please input Phone" />
      <Form.Item
        label="User Role"
        name="userRole"
        rules={[{ required: true, message: "Please select User Role! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Select User Role"
          options={userRoleOptions}
        />
      </Form.Item>
      <CustomTextArea
        label="Address"
        name="address"
        message="Please input Address"
      />

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
