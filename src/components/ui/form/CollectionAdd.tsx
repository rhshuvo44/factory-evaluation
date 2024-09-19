import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  InputNumberProps,
  Select,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TCollection } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import { styleOption } from "../../../constants/Options";

const CollectionAdd = () => {
  dayjs.extend(customParseFormat);
  const [form] = Form.useForm();
  const [total, setTotal] = useState<number>(0);
  const [ratePer, setRatePer] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");

  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
  };
  const onChangeTotal: InputNumberProps["onChange"] = (values) => {
    setTotal(values as number);
  };
  const onChangeRatePer: InputNumberProps["onChange"] = (values) => {
    setRatePer(values as number);
  };
  useEffect(() => {
    form.setFieldsValue({
      amount: total * ratePer,
    });
  }, [total, ratePer, form]);

  const time = new Date().toLocaleTimeString();

  const onFinish = (values: TCollection) => {
    console.log("Received values of form: ", { ...values, time, date });
    // setAmount(values.ratePer * values.total)
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };

  return (
    <Form {...formItemLayout} onFinish={onFinish} form={form}>
      <CustomInputNumber
        label="SL No"
        name="slNo"
        message="Please input SL No"
      />

      <Form.Item
        label="Style"
        name="style"
        rules={[{ required: true, message: "Please select Style! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select"
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
        />
      </Form.Item>
      <CustomInputNumber
        label="Work Order No"
        name="workOrderNo"
        message="Please input! Work Order No"
      />
      <CustomInput
        label="Challan No"
        name="challanNo"
        message="Please input! Challan No"
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
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input! Date" }]}
      >
        <DatePicker onChange={onChangeDate} style={{ width: "100%" }} />
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
