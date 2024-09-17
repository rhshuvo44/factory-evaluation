import { Button, Form } from "antd";
import { TSalary } from "../../../types/tableType";
import CustomInput from "../../form/CustomInput";
import CustomInputNumber from "../../form/CustomInputNumber";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const SalaryAddForm = () => {
  const onFinish = (values: TSalary) => {
    console.log("Received values of form: ", values);
    // Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish}>
      <CustomInputNumber
        label="Employee ID"
        name="employeeID"
        message="Please input Employee ID"
      />

      <CustomInput
        label="Employee Photo"
        name="employeeImg"
        message="Please input! Employee Photo"
      />

      <CustomInput label="Name" name="name" message="Please input! Name" />
      <CustomInput
        label="Designation"
        name="designation"
        message="Please input! Designation"
      />
      <CustomInputNumber
        label="Working Days"
        name="workingDays"
        message="Please input! Working Days"
      />

      <CustomInputNumber
        label="Salary"
        name="salary"
        message="Please input! Salary"
      />
      <CustomInputNumber
        label="Per Day Salary"
        name="perDaySalary"
        message="Please input! Per Day Salary"
      />
      <CustomInputNumber
        label="Over Time"
        name="overTime"
        message="Please input! Over Time"
      />
      <CustomInputNumber
        label="Over Time Rate"
        name="overTimeRate"
        message="Please input! Over Time Rate"
      />
      <CustomInputNumber
        label="Gross Per Day Salary"
        name="grossPerDaySalary"
        message="Please input! Gross Per Day Salary"
      />

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SalaryAddForm;
