import { Button, Form, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import { styleOption } from "../../constants/Options";
import {
  useSingleProductionQuery,
  useUpdateProductionMutation,
} from "../../redux/features/productionReport/productionApi";
import { TProductionReport } from "../../types";

const ProductionUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleProductionQuery(id);
  const [updateProduction] = useUpdateProductionMutation();

  const initialValues = {
    date: data?.data?.date,
    lineNo: data?.data?.lineNo,
    buyer: data?.data?.buyer,
    orderNo: data?.data?.orderNo,
    styleNo: data?.data?.styleNo,
    color: data?.data?.color,
    orderQuantity: data?.data?.orderQuantity,
    readyQuantity: data?.data?.readyQuantity,
    remark: data?.data?.remark,
  };
  if (isLoading) return <Loading />;
  const onFinish = async (values: TProductionReport) => {
    const productionData = {
      lineNo: values.lineNo,
      buyer: values.buyer,
      orderNo: values.orderNo,
      styleNo: values.styleNo,
      color: values.color,
      orderQuantity: values.orderQuantity,
      readyQuantity: values.readyQuantity,

      remark: values.remark,
    };
    const updateData = {
      id,
      data: { ...productionData },
    };
    const res = await updateProduction(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Production successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Production Report update" />
      <Form
        initialValues={initialValues}
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="Style No"
          name="styleNo"
          rules={[{ required: true, message: "Please select Style! " }]}
        >
          <Select
            style={{ width: "100%" }}
            defaultValue="Please select"
            options={styleOption}
          />
        </Form.Item>

        <CustomInputNumber
          label="Order No"
          name="orderNo"
          message="Please input! Order No"
          placeholder="please input Order number"
        />
        <CustomInput
          label="Buyer"
          name="buyer"
          message="Please input! Buyer"
          placeholder="please input Buyer"
        />

        <Form.Item
          label="Line No"
          name="lineNo"
          rules={[{ required: true, message: "Please select Line No! " }]}
        >
          <Select
            style={{ width: "100%" }}
            defaultValue="Please select"
            options={[
              { value: "line 1 / 3rd floor", label: "line 1 / 3rd floor" },
              { value: "line 2 / 4th floor", label: "line 2 / 4th floor" },
              { value: "line 3 / 4th floor", label: "line 3 / 4th floor" },
            ]}
          />
        </Form.Item>

        <CustomInputNumber
          label="Order Quantity"
          name="orderQuantity"
          message="Please input! Order Quantity"
          placeholder="please input Order Quantity Number"
        />
        <CustomInputNumber
          label="Ready Quantity"
          name="readyQuantity"
          message="Please input! Ready Quantity"
          placeholder="please input Ready Quantity Number"
        />

        <CustomInput
          label="Color"
          name="color"
          message="Please input! Color"
          placeholder="please input Color"
        />
        <CustomInput
          label="Remark"
          name="remark"
          message="Please input! Remark"
          placeholder="please input Remark"
        />

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductionUpdate;
