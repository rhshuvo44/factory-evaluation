import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  TimePicker,
  TimePickerProps,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TCollection } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
const CollectionAdd = () => {
  dayjs.extend(customParseFormat);
  let time: any;
  const onChange: TimePickerProps["onChange"] = (_, timeString) => {
    time = timeString;
  };
  let date: any;
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    date = dateString;
  };
  const onFinish = (values: TCollection) => {
    console.log("Received values of form: ", { ...values, time, date });

    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish}>
      <CustomInputNumber
        label="SL No"
        name="slNo"
        message="Please input SL No"
      />
      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: "Please input! Time" }]}
      >
        <TimePicker onChange={onChange} style={{ width: "100%" }} />
      </Form.Item>

      <CustomInput label="Style" name="style" message="Please input! Style" />
      <CustomInputNumber
        label="Total"
        name="total"
        message="Please input! Total"
      />
      <CustomInput
        label="Challan"
        name="challan"
        message="Please input! Challan"
      />
      <CustomInput
        label="Challan No"
        name="challanNo"
        message="Please input! Challan No"
      />

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input! Date" }]}
      >
        <DatePicker onChange={onChangeDate} style={{ width: "100%" }} />
      </Form.Item>

      <CustomInputNumber
        label="Rate Per"
        name="ratePer"
        message="Please input! Rate Per"
      />
      <CustomInputNumber
        label="Amount"
        name="amount"
        message="Please input! Amount"
      />

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CollectionAdd;
