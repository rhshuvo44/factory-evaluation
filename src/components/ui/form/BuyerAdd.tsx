import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Select,
} from "antd";
import { useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateBuyerMutation } from "../../../redux/features/buyer/buyerApi";
import { TBuyerAdd } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomTextArea from "../../form/CustomTextArea";

const BuyerAdd = () => {
  const [form] = Form.useForm();
  const [fabricConsumption, setFabricConsumption] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");
  const [shipmentDate, setShipmentDate] = useState<string | string[]>("");
  const [style, setStyle] = useState<string>("");
  const [item, setItem] = useState<string>("");

  const [createBuyerMutation] = useCreateBuyerMutation();

  const calculateLeadTime = (
    orderDate: string | string[],
    shipmentDate: string | string[]
  ) => {
    if (orderDate && shipmentDate) {
      const leadDays = moment(shipmentDate).diff(moment(orderDate), "days");

      form.setFieldsValue({ leadTime: `${leadDays} days` });
    } else {
      form.setFieldsValue({ leadTime: "" });
    }
  };

  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
    calculateLeadTime(dateString, shipmentDate);
  };
  const onChangeShipmentDate: DatePickerProps["onChange"] = (_, dateString) => {
    setShipmentDate(dateString);
    calculateLeadTime(date, dateString);
  };
  const onChangeFabricConsumption: InputNumberProps["onChange"] = (values) => {
    setFabricConsumption(values as number);
  };
  const onChangeQuantity: InputNumberProps["onChange"] = (values) => {
    setQuantity(values as number);
  };

  const disableDates = (current: Dayjs) => {
    // Disable dates that are more than 45 days ago or in the future
    // Get the start of the current month
    // const startOfMonth = dayjs().startOf("month");
    return (
      current.isBefore(dayjs().subtract(30, "day")) || current.isAfter(dayjs())
    );

    // return current.isBefore(startOfMonth) || current.isAfter(dayjs());
  };

  const handleStyleChange = (value: string) => {
    setStyle(value);
  };
  const handleItemChange = (value: string) => {
    setItem(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      totalFabric: parseFloat(((fabricConsumption / 12) * quantity).toFixed(2)),
    });
  }, [fabricConsumption, form, quantity]);

  const onFinish = async (values: TBuyerAdd) => {
    let styleNo;
    if (style && item) {
      styleNo = style + item + values.styleNo;
    }
    const orderNo = "sta-" + values.orderNo;
    const res = await createBuyerMutation({
      ...values,
      orderNo,
      date,
      shipmentDate,
      styleNo,
    }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Buyer successfully");
    form.resetFields();
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <Form.Item
        label="Order No"
        validateTrigger="onBlur"
        name="orderNo"
        rules={[{ required: true, message: "Please input order no" }]}
      >
        <Input
          addonBefore="sta-"
          placeholder="please input order number"
          style={{ width: "100%" }}
        />
      </Form.Item>
      <CustomInput
        label="Buyer"
        name="buyer"
        message="Please input! Buyer"
        placeholder="please input Buyer"
      />
      <Form.Item label="Style no" style={{ marginBottom: 0, display: "block" }}>
        <Form.Item
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(33% - 8px)" }}
        >
          <Select
            placeholder="Select a style"
            onChange={handleStyleChange}
            style={{ width: "100%" }}
            options={[
              { value: "1", label: "Man's" },
              { value: "2", label: "Ladies" },
            ]}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(33% - 8px)",
            margin: "0 8px",
          }}
        >
          <Select
            placeholder="Select a items"
            disabled={!style}
            onChange={handleItemChange}
            style={{ width: "100%" }}
            options={[
              { value: "1", label: "Man's" },
              { value: "2", label: "Ladies" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="styleNo"
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(32% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input
            addonBefore={style + item}
            disabled={!item}
            placeholder="please style No"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form.Item>

      <CustomTextArea
        label="Description"
        name="description"
        message="Please input! Description"
        placeholder="please input description"
      />

      <Form.Item
        label="Order Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please input! Order Quantity" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeQuantity}
          placeholder="please input Order Quantity number"
        />
      </Form.Item>
      <Form.Item
        label="Order place Date"
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
        label="Shipment Date"
        name="shipmentDate"
        rules={[{ required: true, message: "Please input! shipment Date" }]}
      >
        <DatePicker onChange={onChangeShipmentDate} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Lead Time" name="leadTime">
        <Input style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item
        label="Fabric Consumption (KG)"
        name="fabricConsumption"
        rules={[{ required: true, message: "Please Input Unit! " }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeFabricConsumption}
          placeholder="please input unit number"
        />
      </Form.Item>

      <Form.Item label="Total Fabric Required" name="totalFabric">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Buyer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BuyerAdd;
