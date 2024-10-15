import { LockOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { TChangePassword } from "../../../types";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();

  const onFinish = async (values: TChangePassword) => {
    try {
      const res = await changePassword(values).unwrap();
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex align="center" justify="center">
      <Form
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="oldPassword"
          rules={[
            { required: true, message: "Please input your old Password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="old Password"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new Password!" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="new Password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default ChangePassword;
