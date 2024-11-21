import { Button, Form, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import { userRoleOptions } from "../../constants/Options";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApi";
import { TUSer } from "../../types";

const UserUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useGetSingleUserQuery(id);
  const [updateUser] = useUpdateUserMutation();
  const result = data?.data;
  const initialValues = {
    name: result?.name,
    username: result?.username,
    email: result?.email,
    phone: result?.phone,
    role: result?.role,
    address: result?.address,
  };

  if (isLoading) return <Loading />;

  const onFinish = async (values: TUSer) => {
    const updateData = {
      id,
      data: values,
    };
    const res = await updateUser(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("User data Update successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="User Update" />
      <Form
        layout="vertical"
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={initialValues}
      >
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
            defaultValue="Select User Role"
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
            Update User
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserUpdate;
