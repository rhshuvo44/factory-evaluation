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
  useSingleProductionQuery,
  useUpdateProductionMutation,
} from "../../redux/features/productionReport/productionApi";
import { TProductionInput, TSection } from "../../types";

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
    sellingSection: {
      sellingTarget: data?.data.sellingSection[0].target,
      sellingWIP: data?.data.sellingSection[0].wip,
      sellingOutput: data?.data.sellingSection[0].output,
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
  const onFinish = async (values: TProductionInput) => {
    const cutting: TSection = {
      target: values.cuttingSection.cuttingTarget, // Access from cuttingSection
      wip: values.cuttingSection.cuttingWIP,
      output: values.cuttingSection.cuttingOutput,
    };
    const selling: TSection = {
      target: values.sellingSection.sellingTarget, // Access from sellingSection
      wip: values.sellingSection.sellingWIP,
      output: values.sellingSection.sellingOutput,
    };
    const finishing: TSection = {
      target: values.finishing.finishingTarget, // Access from finishing
      wip: values.finishing.finishingWIP,
      output: values.finishing.finishingOutput,
    };
    const productionData = {
      lineNo: values.lineNo,
      buyer: values.buyer,
      orderNo: values.orderNo,
      styleNo: values.styleNo,
      color: values.color,
      orderQuantity: values.orderQuantity,
      readyQuantity: values.readyQuantity,
      sellingSection: [selling],
      finishing: [finishing],
      remark: values.remark,
      cuttingSection: [cutting],
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
      <SectionTitle title="Utility update" />
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
          label="Selling Section"
          style={{ marginBottom: 0, display: "block" }}
        >
          <Form.Item
            label="Target"
            name={["sellingSection", "sellingTarget"]}
            rules={[{ required: true }]}
            style={{ display: "inline-block", width: "calc(32% - 8px)" }}
          >
            <InputNumber placeholder="Target" />
          </Form.Item>
          <Form.Item
            label="WIP"
            name={["sellingSection", "sellingWIP"]}
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
            name={["sellingSection", "sellingOutput"]}
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

export default ProductionUpdate;
