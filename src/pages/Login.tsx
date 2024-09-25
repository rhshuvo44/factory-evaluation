import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { TLogin } from "../types";
import { verifyToken } from "../utilis/verifyToken";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onFinish = async (values: TLogin) => {
    const res = await login(values).unwrap();

    const user = verifyToken(res?.token);
    
    dispatch(setUser({ user, token: res.token }));
    if (res?.success === "true") {
      // navigate(`${user?.role}/dashboard`, { replace: true });
      toast.success(res?.message);
    } else {
      // Display an error message
      toast.error(res?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Link to="/">Forgot password</Link>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
