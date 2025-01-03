import { Button, Form, Input, InputNumber, InputNumberProps, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useSingleLoanQuery,
  useUpdateLoanMutation,
} from "../../redux/features/loan/loanApi";
import { TLoan } from "../../types";

const LoanUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  // const [date, setDate] = useState<string | string[]>("");

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleLoanQuery(id);
  const [updateLoan] = useUpdateLoanMutation();
  const result = data?.data;
  const [unit, setUnit] = useState<number>(result?.unit);
  const [unitPrice, setUnitPrice] = useState<number>(result?.unitPrice);
  // const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
  //   setDate(dateString);
  // };
  const onChangeUnit: InputNumberProps["onChange"] = (values) => {
    setUnit(values as number);
  };
  const onChangeUnitPrice: InputNumberProps["onChange"] = (values) => {
    setUnitPrice(values as number);
  };

  useEffect(() => {
    const unitValue = unit || result?.unit;
    const unitPriceValue = unitPrice || result?.unitPrice;
    const calculatedAmount =
      unit || unitPrice ? unitValue * unitPriceValue : result?.totalPrice;
    form.setFieldsValue({
      totalPrice: calculatedAmount,
    });
  }, [unit, unitPrice, form, result]);

  const initialValues = {
    description: result?.description,
    // date: result?.date,
    orderNo: result?.orderNo,
    particulars: result?.particulars,
    paymentType: result?.paymentType,
    orderedBy: result?.orderedBy,
    quantity: result?.quantity,
    memoNo: result?.memoNo,
    payTo: result?.payTo,
    unit: result?.unit,
    unitPrice: result?.unitPrice,
    totalPrice: result?.totalPrice,
  };
  // date

  if (isLoading) return <Loading />;

  const onFinish = async (values: TLoan) => {
    const totalPrice = isNaN(values.totalPrice) ? 0 : values.totalPrice;
    const updateData = {
      id,
      data: { ...values, totalPrice },
    };
    const res = await updateLoan(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Loan Return successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Loan update" />
      <Form
        form={form}
        {...formItemLayout} layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Particulars"
          name="particulars"
          rules={[{ required: true, message: "Please Input Particulars! " }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please select Description! " }]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Please select Description"
            options={[
              {
                value: "Emergency Loan Return",
                label: "Emergency Loan Return",
              },
              { value: "EMI Return", label: "EMI Return" },
            ]}
          />
        </Form.Item>
        <CustomInputNumber
          label="Quantity"
          name="quantity"
          message="Please input! Quantity"
        />
        <CustomInputNumber
          label="Memo No"
          name="memoNo"
          message="Please input! Memo No"
        />
        <Form.Item
          label="Ordered By"
          name="orderedBy"
          rules={[{ required: true, message: "Please select Ordered By! " }]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { value: "M.D", label: "M.D" },
              { value: "Chairman", label: "Chairman" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Pay to"
          name="payTo"
          rules={[{ required: true, message: "Please select Pay to! " }]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { value: "Sarkar Alliance OPC", label: "Sarkar Alliance Opc" },
              { value: "M.D", label: "M.D" },
              { value: "Chairman", label: "Chairman" },
            ]}
          />
        </Form.Item>

        {/* <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input! Date" }]}
      >
        <DatePicker onChange={onChangeDate} style={{ width: "100%" }} />
      </Form.Item> */}

        <Form.Item
          label="Payment Type"
          name="paymentType"
          rules={[{ required: true, message: "Please select Payment type! " }]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { value: "Bank", label: "Bank" },
              { value: "Cash", label: "Cash" },
            ]}
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
    </>
  );
};

export default LoanUpdate;
