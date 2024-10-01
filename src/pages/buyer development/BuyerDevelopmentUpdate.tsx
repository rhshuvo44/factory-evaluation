import { Button, Form, InputNumber, InputNumberProps, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import CustomTextArea from "../../components/form/CustomTextArea";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  buyerParticularsOptions,
  paymentOptions,
} from "../../constants/Options";
import {
  useSingleBuyerDevelopmentQuery,
  useUpdateBuyerDevelopmentMutation,
} from "../../redux/features/buyerDevelopment/buyerDevelopmentApi";
import { TBuyer } from "../../types";

const BuyerDevelopmentUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  // const [date, setDate] = useState<string | string[]>("");

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleBuyerDevelopmentQuery(id);
  const [updateBuyerDevelopment] = useUpdateBuyerDevelopmentMutation();
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
    buyerId: result?.buyerId,
    description: result?.description,
    // date: result?.date,
    orderNo: result?.orderNo,
    particulars: result?.particulars,
    paymentType: result?.paymentType,
    quantity: result?.quantity,
    memoNo: result?.memoNo,
    payTo: result?.payTo,
    unit: result?.unit,
    unitPrice: result?.unitPrice,
    totalPrice: result?.totalPrice,
  };
  // date

  if (isLoading) return <Loading />;

  const onFinish = async (values: TBuyer) => {
    const totalPrice = isNaN(values.totalPrice) ? 0 : values.totalPrice;
    const updateData = {
      id,
      data: { ...values, totalPrice },
    };
    const res = await updateBuyerDevelopment(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Buyer Development successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Buyer Development update" />
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          label="Particulars"
          name="particulars"
          rules={[{ required: true, message: "Please select Particulars! " }]}
        >
          <Select style={{ width: "100%" }} options={buyerParticularsOptions} />
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
        <CustomInput
          label="Pay to"
          name="payTo"
          message="Please input! Pay to"
        />

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
          rules={[{ required: true, message: "Please select Payment Type! " }]}
        >
          <Select style={{ width: "100%" }} options={paymentOptions} />
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

export default BuyerDevelopmentUpdate;
