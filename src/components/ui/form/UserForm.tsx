import { Button, Form, Input, Select } from "antd";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { userRoleOptions } from "../../../constants/Options";
import { useCreateUserMutation } from "../../../redux/features/user/userApi";
import { TUSer } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomTextArea from "../../form/CustomTextArea";

const UserForm = () => {
  const [form] = Form.useForm();
  const [createUser] = useCreateUserMutation();
  const onFinish = async (values: TUSer) => {
    const res = await createUser(values).unwrap();

    if (!res.success) return toast.error(res.message);
    toast.success("Create User successfully");
    form.resetFields();
  };
  return (
    <Form {...formItemLayout} layout="vertical" onFinish={onFinish} form={form}>
      <CustomInput
        label="Name"
        name="name"
        message="Please input Name"
        placeholder="please input Name"
      />
      <CustomInput
        label="Username"
        name="username"
        message="Please input Username"
        placeholder="please input username"
      />
      <CustomInput
        label="Email"
        name="email"
        message="Please input Email"
        placeholder="please input email"
      />

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Password must be at least 8 characters long",
          },
        ]}
      >
        <Input.Password
          style={{ width: "100%" }}
          placeholder="please input password"
        />
      </Form.Item>

      <CustomInput
        label="Phone"
        name="phone"
        message="Please input Phone"
        placeholder="please input phone number"
      />
      <Form.Item
        label="User Role"
        name="role"
        rules={[{ required: true, message: "Please select User Role! " }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Please select user role"
          options={userRoleOptions}
        />
      </Form.Item>
      <CustomTextArea
        label="Address"
        name="address"
        message="Please input Address"
        placeholder="please input Address"
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
