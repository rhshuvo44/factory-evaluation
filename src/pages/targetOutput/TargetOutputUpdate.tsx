import { Button, Form, InputNumber, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import { styleOption } from "../../constants/Options";
import {
  useSingleTargetOutputQuery,
  useUpdateTargetOutputMutation,
} from "../../redux/features/targetOutput/targetOutputApi";
import { TSection, TTargetInputFiled } from "../../types";

const TargetOutputUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleTargetOutputQuery(id);
  const [updateTargetOutput] = useUpdateTargetOutputMutation();

  const initialValues = {
    date: data?.data?.date,
    buyer: data?.data?.buyer,
    orderNo: data?.data?.orderNo,
    styleNo: data?.data?.styleNo,
    color: data?.data?.color,
    orderQuantity: data?.data?.orderQuantity,
    sewingSection: {
      sewingTarget: data?.data.sewingSection[0].target,
      sewingWIP: data?.data.sewingSection[0].wip,
      sewingOutput: data?.data.sewingSection[0].output,
    },
    finishing: {
      finishingTarget: data?.data.finishing[0].target,
      finishingWIP: data?.data.finishing[0].wip,
      finishingOutput: data?.data.finishing[0].output,
    },
    remark: data?.data?.remark,
    cuttingSection: {
      cuttingTarget: data?.data.cuttingSection[0].target,
      cuttingWIP: data?.data.cuttingSection[0].wip,
      cuttingOutput: data?.data.cuttingSection[0].output,
    },
  };
  if (isLoading) return <Loading />;
  const onFinish = async (values: TTargetInputFiled) => {
    const cutting: TSection = {
      target: values.cuttingSection.cuttingTarget, // Access from cuttingSection
      wip: values.cuttingSection.cuttingWIP,
      output: values.cuttingSection.cuttingOutput,
    };
    const sewing: TSection = {
      target: values.sewingSection.sewingTarget, // Access from sewingSection
      wip: values.sewingSection.sewingWIP,
      output: values.sewingSection.sewingOutput,
    };
    const finishing: TSection = {
      target: values.finishing.finishingTarget, // Access from finishing
      wip: values.finishing.finishingWIP,
      output: values.finishing.finishingOutput,
    };
    const targetOutputData = {
      buyer: values.buyer,
      orderNo: values.orderNo,
      styleNo: values.styleNo,
      color: values.color,
      orderQuantity: values.orderQuantity,
      sewingSection: [sewing],
      finishing: [finishing],
      remark: values.remark,
      cuttingSection: [cutting],
    };
    const updateData = {
      id,
      data: { ...targetOutputData },
    };
    const res = await updateTargetOutput(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Target report successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Target & Output update" />
      <Form
        initialValues={initialValues}
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
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

        <CustomInputNumber
          label="Order Quantity"
          name="orderQuantity"
          message="Please input! Order Quantity"
          placeholder="please input Order Quantity Number"
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
        {/* Cutting Section */}
        <Form.Item
          label="Cutting Section"
          style={{ marginBottom: 0, display: "block" }}
        >
          <Form.Item
            label="Target"
            name={["cuttingSection", "cuttingTarget"]}
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(32% - 8px)" }}
          >
            <InputNumber placeholder="Target" />
          </Form.Item>
          <Form.Item
            label="WIP"
            name={["cuttingSection", "cuttingWIP"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(32% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber placeholder="WIP" />
          </Form.Item>
          <Form.Item
            label="Output"
            name={["cuttingSection", "cuttingOutput"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(32% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber placeholder="Output" />
          </Form.Item>
        </Form.Item>

        {/* Selling Section */}
        <Form.Item
          label="sewing Section"
          style={{ marginBottom: 0, display: "block" }}
        >
          <Form.Item
            label="Target"
            name={["sewingSection", "sewingTarget"]}
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(32% - 8px)" }}
          >
            <InputNumber placeholder="Target" />
          </Form.Item>
          <Form.Item
            label="WIP"
            name={["sewingSection", "sewingWIP"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(32% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber placeholder="WIP" />
          </Form.Item>
          <Form.Item
            label="Output"
            name={["sewingSection", "sewingOutput"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(32% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber placeholder="Output" />
          </Form.Item>
        </Form.Item>

        {/* Finishing Section */}
        <Form.Item
          label="Finishing Section"
          style={{ marginBottom: 0, display: "block" }}
        >
          <Form.Item
            label="Target"
            name={["finishing", "finishingTarget"]}
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(32% - 8px)" }}
          >
            <InputNumber placeholder="Target" />
          </Form.Item>
          <Form.Item
            label="WIP"
            name={["finishing", "finishingWIP"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(32% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber placeholder="WIP" />
          </Form.Item>
          <Form.Item
            label="Output"
            name={["finishing", "finishingOutput"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(32% - 8px)",
              margin: "0 8px",
            }}
          >
            <InputNumber placeholder="Output" />
          </Form.Item>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TargetOutputUpdate;
