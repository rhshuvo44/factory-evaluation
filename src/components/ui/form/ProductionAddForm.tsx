import { Button, DatePicker, DatePickerProps, Form, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { styleOption } from "../../../constants/Options";
import { userRole } from "../../../constants/userRole";
import { useCreateNotificationMutation } from "../../../redux/features/notification/notificationApi";
import { useCreateProductionMutation } from "../../../redux/features/productionReport/productionApi";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
import { TProductionReport } from "../../../types";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
const ProductionAddForm = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState<string | string[]>("");
  const [createProduction] = useCreateProductionMutation();
  const { data: user } = useGetMeQuery(undefined);

  const [createNotificationMutation] = useCreateNotificationMutation();
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };

  const disableDates = (current: Dayjs) => {
    // Disable dates that are more than 45 days ago or in the future
    // Get the start of the current month
    const startOfMonth = dayjs().startOf("month");
    // current.isBefore(dayjs().subtract(45, "day")) || current.isAfter(dayjs())
    return current.isBefore(startOfMonth) || current.isAfter(dayjs());
  };
  
  const onFinish = async (values: TProductionReport) => {
    const res = await createProduction({ ...values, date }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Production successfully");
    form.resetFields();
    // Check if user role is admin before creating a notification
    if (user?.data?.role === userRole.Coordinator) {
      const notify = {
        message: `New production Report Generate created by ${user?.data?.name}`,
        date: date,
      };
      await createNotificationMutation(notify);
    }
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
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

      <Form.Item
        label="Line No"
        name="lineNo"
        rules={[{ required: true, message: "Please select Line No! " }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Please select line number"
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

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductionAddForm;
