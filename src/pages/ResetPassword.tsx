import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../redux/features/auth/authApi";
import { TReset } from "../types";

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values: TReset) => {
    try {
      const res = await resetPassword(values).unwrap();
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Form
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new Password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="new Password"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
