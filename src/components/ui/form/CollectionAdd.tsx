import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  InputNumberProps,
  Select,
} from "antd";
import dayjs, { Dayjs } from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { styleOption } from "../../../constants/Options";
import { useCreateCollectionMutation } from "../../../redux/features/collection/collectionApi";
import { TCollection } from "../../../types/tableType";
import CustomInputNumber from "../../form/CustomInputNumber";

const CollectionAdd = () => {
  dayjs.extend(customParseFormat);
  const [form] = Form.useForm();
  const [total, setTotal] = useState<number>(0);
  const [ratePer, setRatePer] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");
  const [createCollectionMutation] = useCreateCollectionMutation();

  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };
  const onChangeTotal: InputNumberProps["onChange"] = (values) => {
    setTotal(values as number);
  };
  const onChangeRatePer: InputNumberProps["onChange"] = (values) => {
    setRatePer(values as number);
  };
  const disableDates = (current: Dayjs) => {
    // Disable dates that are more than 45 days ago or in the future
// Get the start of the current month
const startOfMonth = dayjs().startOf("month");
// current.isBefore(dayjs().subtract(45, "day")) || current.isAfter(dayjs())
return current.isBefore(startOfMonth) || current.isAfter(dayjs());
  };
  useEffect(() => {
    form.setFieldsValue({
      amount: total * ratePer,
    });
  }, [total, ratePer, form]);

  const time = new Date().toLocaleTimeString();

  const onFinish = async (values: TCollection) => {
    const res = await createCollectionMutation({
      ...values,
      time,
      date,
    }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create successfully");
    form.resetFields();
  };

  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <Form.Item
        label="Style"
        name="style"
        rules={[{ required: true, message: "Please select Style! " }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Please select Style"
          options={styleOption}
        />
      </Form.Item>
      <Form.Item
        label="Total"
        name="total"
        rules={[{ required: true, message: "Please input! Total" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeTotal}
          placeholder="please input Total number"
        />
      </Form.Item>
      <CustomInputNumber
        label="Work Order No"
        name="workOrderNo"
        message="Please input! Work Order No"
        placeholder="please input Work Order number"
      />
      <CustomInputNumber
        label="Challan No"
        name="challanNo"
        message="Please input! Challan No"
        placeholder="please input Chalan Number"
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

      <Form.Item
        label="Rate Per"
        name="ratePer"
        rules={[{ required: true, message: "Please input! Rate Per" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeRatePer}
          placeholder="please input unit per rate"
        />
      </Form.Item>
      <Form.Item label="Amount" name="amount">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CollectionAdd;
