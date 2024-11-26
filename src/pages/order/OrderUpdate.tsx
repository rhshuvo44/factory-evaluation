import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useSingleBuyerQuery,
  useUpdateBuyerMutation,
} from "../../redux/features/buyer/buyerApi";
import { TBuyerAdd } from "../../types";

const OrderUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  // const [date, setDate] = useState<string | string[]>("");

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleBuyerQuery(id);
  const [updateOrder] = useUpdateBuyerMutation();
  const result = data?.data;
  const [fabricConsumption, setFabricConsumption] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [shipmentDate, setShipmentDate] = useState<string | string[]>("");

  const calculateLeadTime = (shipmentDate: string | string[]) => {
    if (shipmentDate) {
      const leadDays = moment(shipmentDate).diff(moment(), "days");
      form.setFieldsValue({ leadTime: `${leadDays} days` });
    } else {
      form.setFieldsValue({ leadTime: "" });
    }
  };

  const onChangeShipmentDate: DatePickerProps["onChange"] = (_, dateString) => {
    setShipmentDate(dateString);
    calculateLeadTime(dateString);
  };
  const onChangeFabricConsumption: InputNumberProps["onChange"] = (values) => {
    setFabricConsumption(values as number);
  };
  const onChangeQuantity: InputNumberProps["onChange"] = (values) => {
    setQuantity(values as number);
  };
  const orderDate = dayjs(result?.date);

  const shipmentDateDataBase = dayjs(result?.shipmentDate);

  useEffect(() => {
    const fabricConsumptionValue =
      fabricConsumption || result?.fabricConsumption;
    const quantityValue = quantity || result?.quantity;
    const calculatedFabric =
      fabricConsumption || quantity
        ? parseFloat(((fabricConsumptionValue / 12) * quantityValue).toFixed(2))
        : result?.totalFabric;

    form.setFieldsValue({
      totalFabric: calculatedFabric,
    });
  }, [fabricConsumption, form, quantity, result]);
  const initialValues = {
    buyer: result?.buyer,
    description: result?.description,
    date: orderDate,
    shipmentDate: shipmentDateDataBase,
    orderNo: result?.orderNo,
    quantity: result?.quantity,
    styleNo: result?.styleNo,
    leadTime: result?.leadTime,
    fabricConsumption: result?.fabricConsumption,
    totalFabric: result?.totalFabric,
  };

  if (isLoading) return <Loading />;

  const onFinish = async (values: TBuyerAdd) => {
    const updateData = {
      id: result?._id,
      data: { ...values, shipmentDate },
    };
    const res = await updateOrder(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Order successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Order update" />

      <Form
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
        initialValues={initialValues}
        className="mt-2"
        layout="vertical"
      >
        <Form.Item
          label="Order No"
          validateTrigger="onBlur"
          name="orderNo"
          rules={[{ required: true, message: "Please input order no" }]}
        >
          <Input
            disabled
            placeholder="please input order number"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <CustomInput
          label="Buyer"
          name="buyer"
          message="Please input! Buyer"
          placeholder="please input Buyer"
        />
        <CustomInput
          label="Style no"
          name="styleNo"
          message="please style No"
          placeholder="please style No"
        />

        <CustomTextArea
          label="Description"
          name="description"
          message="Please input! Description"
          placeholder="please input description"
        />

        <Form.Item
          label="Order Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input! Order Quantity" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            onChange={onChangeQuantity}
            placeholder="please input Order Quantity number"
          />
        </Form.Item>
        <Form.Item
          label="Order place Date"
          name="date"
          rules={[{ required: true, message: "Please input! Date" }]}
        >
          <DatePicker
            disabled
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Shipment Date"
          name="shipmentDate"
          rules={[{ required: true, message: "Please input! shipment Date" }]}
        >
          <DatePicker
            onChange={onChangeShipmentDate}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Lead Time" name="leadTime">
          <Input style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item
          label="Fabric Consumption (KG)"
          name="fabricConsumption"
          rules={[{ required: true, message: "Please Input Unit! " }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            onChange={onChangeFabricConsumption}
            placeholder="please input unit number"
          />
        </Form.Item>

        <Form.Item label="Total Fabric Required" name="totalFabric">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Order Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default OrderUpdate;
