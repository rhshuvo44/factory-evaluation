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
import { formItemLayout } from "../../../constants/formItemLayout";
import { paymentOptions } from "../../../constants/Options";
import { useCreateTravelMutation } from "../../../redux/features/travelling/travellingApi";
import { TTravel } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomTextArea from "../../form/CustomTextArea";
import CustomInputNumber from "../../form/CustomInputNumber";

const TravellingForm = () => {
  const [form] = Form.useForm();
  const [unit, setUnit] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");
  const [createTravel] = useCreateTravelMutation();
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
  const onFinish = (values: TTravel) => {
    console.log("Received values of form: ", { ...values, date });
    createTravel({ ...values, date });
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <CustomInput
        label="Particulars"
        name="particulars"
        message="Please input! Particulars"
      />
      <CustomTextArea
        label="Description"
        name="description"
        message="Please input! Description"
      />
      <CustomInput
        label="Remark"
        name="remark"
        message="Please input! Remark"
      />
      <CustomInputNumber
        label="Buyer ID"
        name="buyerId"
        message="Please input! Buyer ID"
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
          defaultValue="Please select Payment Type"
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

export default TravellingForm;
