import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import login from "../styles/login.module.css";
import { TLogin } from "../types/LoginFormType";
const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values: TLogin) => {
    console.log("Received values of form: ", values);
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
    if (values.username === "admin" && values.password === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
    if (values.username === "executive" && values.password === "executive") {
      navigate("/executive-director/dashboard", { replace: true });
    } else {
      // Display an error message
      alert("Invalid username or password");
    }
  };
  return (
    <div className={login.section}>
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
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
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
