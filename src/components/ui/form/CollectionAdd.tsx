import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  Select,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TCollection } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";
import { styleOption } from "../../../constants/dropdownoptions";

const CollectionAdd = () => {
  dayjs.extend(customParseFormat);
  let date: string;
  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    date = dateString as string;
  };
  // const [ratePer, setRatePer] = useState<number>(0);
  // const [total, setTotal] = useState<number>(0);
  const time = new Date().toLocaleTimeString();

  // let total: number;
  // let ratePer: number;
  // const amount = total * ratePer;
  // const handleTotalChange = (value: number | 0) => {
  //   setTotal(value as number);
  // };

  // const handleRatePerChange = (value: number | 0) => {
  //   setRatePer(value as number);
  // };

  // console.log("amount", amount);
  const onFinish = (values: TCollection) => {
    console.log("Received values of form: ", { ...values, time, date });
    // setAmount(values.ratePer * values.total)
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
          // onChange={handleTotalChange}
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
          // onChange={handleRatePerChange}
        />
      </Form.Item>
      <Form.Item label="Amount" name="amount">
        <InputNumber
          style={{ width: "100%" }}
          // min={0}
          readOnly
          // defaultValue={amount}
          // value={amount}
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

export default CollectionAdd;
