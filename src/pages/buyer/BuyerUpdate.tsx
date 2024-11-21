import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
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

const BuyerUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  // const [date, setDate] = useState<string | string[]>("");

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleBuyerQuery(id);
  const [updateBuyer] = useUpdateBuyerMutation();
  const result = data?.data;
  const [fabricConsumption, setFabricConsumption] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [date, setDate] = useState<string | string[]>("");
  const [shipmentDate, setShipmentDate] = useState<string | string[]>("");

  const calculateLeadTime = (
    orderDate: string | string[],
    shipmentDate: string | string[]
  ) => {
    if (orderDate && shipmentDate) {
      const leadDays = moment(shipmentDate).diff(moment(orderDate), "days");

      form.setFieldsValue({ leadTime: `${leadDays} days` });
    } else {
      form.setFieldsValue({ leadTime: "" });
    }
  };

  const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString);
    calculateLeadTime(dateString, shipmentDate);
  };
  const onChangeShipmentDate: DatePickerProps["onChange"] = (_, dateString) => {
    setShipmentDate(dateString);
    calculateLeadTime(date, dateString);
  };
  const onChangeFabricConsumption: InputNumberProps["onChange"] = (values) => {
    setFabricConsumption(values as number);
  };
  const onChangeQuantity: InputNumberProps["onChange"] = (values) => {
    setQuantity(values as number);
  };

  const disableDates = (current: Dayjs) => {
    // Disable dates that are more than 45 days ago or in the future
    // Get the start of the current month
    // const startOfMonth = dayjs().startOf("month");
    return (
      current.isBefore(dayjs().subtract(30, "day")) || current.isAfter(dayjs())
    );

    // return current.isBefore(startOfMonth) || current.isAfter(dayjs());
  };

  // If result?.date is a string, convert it to moment
  const orderDate = result?.date ? moment(result?.date) : "";
  const shipmentDateDataBase = result?.shipmentDate
    ? moment(result?.shipmentDate)
    : "";

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
    orderNo: result?.orderNo,
    quantity: result?.quantity,
    styleNo: result?.styleNo,
    shipmentDate: shipmentDateDataBase,
    leadTime: result?.leadTime,
    fabricConsumption: result?.fabricConsumption,
    totalFabric: result?.totalFabric,
  };

  if (isLoading) return <Loading />;

  const onFinish = async (values: TBuyerAdd) => {
    const updateData = {
      id: result?._id,
      data: { ...values },
    };
    const res = await updateBuyer(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Buyer successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Buyer update" />

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
            onChange={onChangeDate}
            style={{ width: "100%" }}
            disabledDate={disableDates}
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
            Buyer Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default BuyerUpdate;