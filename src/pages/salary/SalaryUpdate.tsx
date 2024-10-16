import { Button, Form, InputNumber, InputNumberProps, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import { designationOption } from "../../constants/Options";
import {
  useSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../redux/features/employee/employeeApi";
import { TSalary } from "../../types";

const SalaryUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  // const [date, setDate] = useState<string | string[]>("");

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleEmployeeQuery(id);
  const [updateEmployee] = useUpdateEmployeeMutation();

  const [perDaySalary, setPerDaySalary] = useState<number>(
    data?.data?.perDaySalary
  );
  const [overTime, setOverTime] = useState<number>(data?.data?.overTime);

  const onChangePerDaySalary: InputNumberProps["onChange"] = (values) => {
    setPerDaySalary(values as number);
  };
  const onChangeOverTime: InputNumberProps["onChange"] = (values) => {
    setOverTime(values as number);
  };
  useEffect(() => {
    const perDaySalaryValue = parseFloat(
      perDaySalary || data?.data?.perDaySalary
    );
    const overTimeValue = parseFloat(overTime || data?.data?.overTime);
    const salary = perDaySalaryValue
      ? perDaySalaryValue * 26
      : data?.data?.salary;
    const overTimeRate = perDaySalaryValue
      ? perDaySalaryValue / 10
      : data?.data?.overTimeRate;
    const grossPerDaySalary = perDaySalaryValue
      ? perDaySalaryValue + (perDaySalaryValue / 10) * overTimeValue
      : data?.data?.grossPerDaySalary;
    form.setFieldsValue({
      salary: salary,
      overTimeRate: overTimeRate,
      grossPerDaySalary: grossPerDaySalary,
    });
  }, [perDaySalary, overTime, form, data]);

  const initialValues = {
    designation: data?.data?.designation,
    grossPerDaySalary: data?.data?.grossPerDaySalary,
    // id:data?.data?.,
    name: data?.data?.name,
    overTime: data?.data?.overTime,
    overTimeRate: data?.data?.overTimeRate,
    perDaySalary: data?.data?.perDaySalary,
    // photo:data?.data?.,
    salary: data?.data?.salary,
    status: data?.data?.status,
    workingDays: data?.data?.workingDays,
  };
  // date

  if (isLoading) return <Loading />;

  const onFinish = async (values: TSalary) => {
    const salary = isNaN(values.salary) ? 0 : values.salary;
    const grossPerDaySalary = isNaN(values.grossPerDaySalary)
      ? 0
      : values.grossPerDaySalary;
    const updateData = {
      id,
      data: { ...values, salary, grossPerDaySalary },
    };
    // console.log(updateData);
    const res = await updateEmployee(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Employee Data successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Employee update" />
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <CustomInput
          label="Name"
          name="name"
          message="Please input! Name"
          placeholder="please input Employee Name"
        />

        <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: "Please select Designation! " }]}
        >
          <Select style={{ width: "100%" }} options={designationOption} />
        </Form.Item>
        <Form.Item label="Working Days" name="workingDays">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select Status! " }]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { value: "P", label: "P" },
              { value: "A", label: "A" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Salary" name="salary">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item
          label="Per Day Salary"
          name="perDaySalary"
          rules={[{ required: true, message: "Please Input Per Day Salary " }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            onChange={onChangePerDaySalary}
            placeholder="please input Employee per Day Salary"
          />
        </Form.Item>

        <Form.Item
          label="Over Time"
          name="overTime"
          rules={[{ required: true, message: "Please Input Over Time" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            onChange={onChangeOverTime}
            placeholder="please input over time hours"
          />
        </Form.Item>
        <Form.Item label="Over Time Rate" name="overTimeRate">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item label="Gross Per Day Salary" name="grossPerDaySalary">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add Employee Data
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SalaryUpdate;
