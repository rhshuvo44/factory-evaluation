import { Button, Form, InputNumber, InputNumberProps, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import CustomTextArea from "../../components/form/CustomTextArea";
import Loading from "../../components/ui/Loading";
import { formItemLayout } from "../../constants/formItemLayout";
import { paymentOptions } from "../../constants/Options";
import {
  useSingleTravellingQuery,
  useUpdateTravellingMutation,
} from "../../redux/features/travelling/travellingApi";
import { TTravel } from "../../types";
import SectionTitle from "../../components/ui/SectionTitle";

const TravellingAllowanceUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleTravellingQuery(id);
  const [updateTravelling] = useUpdateTravellingMutation();
  const result = data?.data;
  const [unit, setUnit] = useState<number>(result?.unit);
  const [unitPrice, setUnitPrice] = useState<number>(result?.unitPrice);

  const onChangeUnit: InputNumberProps["onChange"] = (values) => {
    setUnit(values as number);
  };
  const onChangeUnitPrice: InputNumberProps["onChange"] = (values) => {
    setUnitPrice(values as number);
  };
  useEffect(() => {
    form.setFieldsValue({
      totalPrice: unit * unitPrice || result?.totalPrice,
    });
  }, [unit, unitPrice, form, result?.totalPrice]);
  const initialValues = {
    buyerId: result?.buyerId,
    description: result?.description,
    orderNo: result?.orderNo,
    particulars: result?.particulars,
    payTo: result?.payTo,
    paymentType: result?.paymentType,
    remark: result?.remark,
    unit: result?.unit,
    unitPrice: result?.unitPrice,
    totalPrice: result?.totalPrice,
  };

  if (isLoading) return <Loading />;

  const onFinish = async (values: TTravel) => {
    const totalPrice = isNaN(values.totalPrice) ? 0 : values.totalPrice;
    const updateData = {
      id,
      data: { ...values, totalPrice },
    };
    const res = await updateTravelling(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Travelling Allowance successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Travelling Allowance" />
      <Form
        form={form}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={initialValues}
      >
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
        <CustomInput
          label="Pay to"
          name="payTo"
          message="Please input! Pay to"
        />
        <Form.Item
          label="Payment Type"
          name="paymentType"
          rules={[{ required: true, message: "Please select Payment Type! " }]}
        >
          <Select
            style={{ width: "100%" }}
            defaultValue={result.paymentType}
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
    </>
  );
};

export default TravellingAllowanceUpdate;
