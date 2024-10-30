import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  Select,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { styleOption } from "../../../constants/Options";
import { userRole } from "../../../constants/userRole";
import { useCreateNotificationMutation } from "../../../redux/features/notification/notificationApi";
import { useGetTodayProductionQuery } from "../../../redux/features/productionReport/productionApi";
import { useCreateTargetOutputMutation } from "../../../redux/features/targetOutput/targetOutputApi";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
import { TSection, TTargetInputFiled } from "../../../types";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import Loading from "../Loading";

const TargetOutputAddForm = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState<string | string[]>("");
  const [createTargetOutput] = useCreateTargetOutputMutation();
  const { data, isLoading } = useGetTodayProductionQuery(undefined);
  const { data: user } = useGetMeQuery(undefined);

  const [createNotificationMutation] = useCreateNotificationMutation();
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };
  const disableDates = (current: Dayjs) => {
    // Disable dates that are more than 45 days ago or in the future

    const startOfMonth = dayjs().startOf("month");
    // current.isBefore(dayjs().subtract(45, "day")) || current.isAfter(dayjs())
    return current.isBefore(startOfMonth) || current.isAfter(dayjs());
  };
  const initialValues = {
    sewingSection: {
      sewingOutput: data?.data?.readyQuantity,
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
    const targetData = {
      date: date,
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

    const res = await createTargetOutput(targetData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Target report successfully");
    form.resetFields();
    // Check if user role is admin before creating a notification
    if (user?.data?.role === userRole.Coordinator) {
      const notify = {
        message: `New target output created by ${user?.data?.name}`,
        date: date,
      };
      await createNotificationMutation(notify);
    }
  };

  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item
        label="Style No"
        name="styleNo"
        rules={[{ required: true, message: "Please select Style! " }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Please select Style"
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

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input! Date" }]}
      >
        <DatePicker
          onChange={onChangeDate}
          style={{ width: "100%" }}
          disabledDate={disableDates}
        />
      </Form.Item>

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
          <InputNumber min={0} placeholder="Target" />
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
          <InputNumber min={0} placeholder="WIP" />
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
          <InputNumber min={0} placeholder="Output" />
        </Form.Item>
      </Form.Item>

      {/* sewing Section */}
      <Form.Item
        label="Sewing Section"
        style={{ marginBottom: 0, display: "block" }}
      >
        <Form.Item
          label="Target"
          name={["sewingSection", "sewingTarget"]}
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(32% - 8px)" }}
        >
          <InputNumber min={0} placeholder="Target" />
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
          <InputNumber min={0} placeholder="WIP" />
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
          <InputNumber disabled />
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
          <InputNumber min={0} placeholder="Target" />
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
          <InputNumber min={0} placeholder="WIP" />
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
          <InputNumber min={0} placeholder="Output" />
        </Form.Item>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TargetOutputAddForm;
