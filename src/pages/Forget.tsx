import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "sonner";
import { useForgetPasswordMutation } from "../redux/features/auth/authApi";
import { TForget } from "../types";

const Forget = () => {
  const [forget] = useForgetPasswordMutation();

  const onFinish = async (values: TForget) => {
    try {
      const res = await forget(values).unwrap();
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

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Forget Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Forget;
