import { Button, Form, InputNumber, InputNumberProps } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import CustomTextArea from "../../components/form/CustomTextArea";
import Loading from "../../components/ui/Loading";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useGetSingleMiscellaneousQuery,
  useUpdateMiscellaneousMutation,
} from "../../redux/features/Miscellaneous/MiscellaneousApi";
import { TMiscellaneous } from "../../types";

const MiscellaneousUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useGetSingleMiscellaneousQuery(id);
  const [updateTravelling] = useUpdateMiscellaneousMutation();
  const result = data?.data;
  const [unit, setUnit] = useState<number>(result?.unit);
  const [unitPrice, setUnitPrice] = useState<number>(result?.unitPrice);

  const onChangeUnit: InputNumberProps["onChange"] = (values) => {
    setUnit(values as number);
  };
  const onChangeUnitPrice: InputNumberProps["onChange"] = (values) => {
    setUnitPrice(values as number);
  };
  // console.log(data);
  // buyerId
  // date ----
  // description
  // orderNo
  // particulars
  // payTo
  // paymentType ----
  // remark
  // totalPrice
  // unit
  // unitPrice
  console.log(data?.data?.result?.buyerId);
  const initialValues = {
    buyerId: result?.buyerId,
    description: result?.description,
    orderNo: result?.orderNo,
    particulars: result?.particulars,
    payTo: result?.payTo,
    remark: result?.remark,
    unit: result?.unit,
    unitPrice: result?.unitPrice,
    totalPrice: result?.totalPrice,
  };

  useEffect(() => {
    form.setFieldsValue({
      totalPrice: unit * unitPrice,
    });
  }, [unit, unitPrice, form]);
  if (isLoading) return <Loading />;

  const onFinish = async (values: TMiscellaneous) => {
    const updateData = {
      id,
      data: { ...values },
    };
    const res = await updateTravelling(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Miscellaneous successfully");
    navigate(-1);
  };
  return (
    <Form
      {...formItemLayout}
      onFinish={onFinish}
      form={form}
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
      <CustomInput label="Pay to" name="payTo" message="Please input! Pay to" />
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
        <InputNumber
          defaultValue={result.totalPrice}
          style={{ width: "100%" }}
          disabled
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

export default MiscellaneousUpdate;
