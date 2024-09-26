import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  InputNumberProps,
  Select,
} from "antd";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import {
  buyerParticularsOptions,
  paymentOptions,
} from "../../../constants/Options";
import { useCreateBuyerDevelopmentMutation } from "../../../redux/features/buyerDevelopment/buyerDevelopmentApi";
import { TBuyer } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import CustomTextArea from "../../form/CustomTextArea";

const BuyerDevelopmentAdd = () => {
  const [form] = Form.useForm();
  const [unit, setUnit] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");
  const [createBuyerDevelopmentMutation] = useCreateBuyerDevelopmentMutation();
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };
  const onChangeUnit: InputNumberProps["onChange"] = (values) => {
    setUnit(values as number);
  };
  const onChangeUnitPrice: InputNumberProps["onChange"] = (values) => {
    setUnitPrice(values as number);
  };
  useEffect(() => {
    form.setFieldsValue({
      totalPrice: unit * unitPrice,
    });
  }, [unit, unitPrice, form]);

  const onFinish = async (values: TBuyer) => {
    const res = await createBuyerDevelopmentMutation({
      ...values,
      date,
    }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Buyer Development Cost successfully");
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <Form.Item
        label="Particulars"
        name="particulars"
        rules={[{ required: true, message: "Please select Particulars! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select Particular"
          options={buyerParticularsOptions}
        />
      </Form.Item>
      <CustomTextArea
        label="Description"
        name="description"
        message="Please input! Description"
      />
      <CustomInputNumber
        label="Quantity"
        name="quantity"
        message="Please input! Quantity"
      />
      <CustomInputNumber
        label="Buyer ID"
        name="buyerId"
        message="Please input! Buyer ID"
      />
      <CustomInputNumber
        label="Memo No"
        name="memoNo"
        message="Please input! Memo No"
      />
      <CustomInputNumber
        label="Order No"
        name="orderNo"
        message="Please input! Order No"
      />
      <CustomInput label="Pay to" name="payTo" message="Please input! Pay to" />

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input! Date" }]}
      >
        <DatePicker onChange={onChangeDate} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Payment Type"
        name="paymentType"
        rules={[{ required: true, message: "Please select Payment type! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select Payment"
          options={paymentOptions}
        />
      </Form.Item>
      <Form.Item
        label="Unit"
        name="unit"
        rules={[{ required: true, message: "Please Input Unit! " }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeUnit}
        />
      </Form.Item>

      <Form.Item
        label="Unit Price"
        name="unitPrice"
        rules={[{ required: true, message: "Please Input Unit Price! " }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeUnitPrice}
        />
      </Form.Item>

      <Form.Item label="Total Price" name="totalPrice">
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

export default BuyerDevelopmentAdd;
