import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Select,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { userRole } from "../../../constants/userRole";
import {
  useGetAllBuyerOrderNoQuery,
  useSingleBuyerQuery,
} from "../../../redux/features/buyer/buyerApi";

import { useGetMeQuery } from "../../../redux/features/user/userApi";
import { TProductionReport } from "../../../types";
import CustomInput from "../../form/CustomInput";
import Loading from "../Loading";
const ProductionAddForm = () => {
  const [form] = Form.useForm();
  const [orderNo, setOrderNo] = useState<string>();

  const { data: user } = useGetMeQuery(undefined);

  const queryParams = orderNo ? orderNo : undefined;

  const { data: allOrderNo } = useGetAllBuyerOrderNoQuery("");
  const orders = allOrderNo?.data;
  const { data, isLoading } = useSingleBuyerQuery(queryParams);
  const result = data?.data;
  // const [createNotificationMutation] = useCreateNotificationMutation();

  const orderNoChangeHandler: InputNumberProps["onChange"] = (values) => {
    setOrderNo(values as string);
  };

  useEffect(() => {
    if (result) {
      form.setFieldsValue({
        buyer: result?.buyer,
        description: result?.description,
        date: result?.date ? moment(result?.date) : undefined,
        orderNo: result?.orderNo,
        quantity: result?.quantity,
        styleNo: result?.styleNo,
        shipmentDate: result?.shipmentDate
          ? moment(result?.shipmentDate)
          : undefined,
        leadTime: result?.leadTime,
        fabricConsumption: result?.fabricConsumption,
        totalFabric: result?.totalFabric,
      });
    }
  }, [form, result]);

  const onFinish = async (values: TProductionReport) => {
    console.log(values);
    // const res = await createProduction({ ...values, date }).unwrap();
    // if (!res.success) return toast.error(res.message);
    toast.success("Create Production Report successfully");
    // form.resetFields();
    // Check if user role is admin before creating a notification
    if (user?.data?.role === userRole.Coordinator) {
      // const notify = {
      //   message: `New production Report Generate created by ${user?.data?.name}`,
      //   date: date,
      // };
      // await createNotificationMutation(notify);
    }
  };
  return (
    <Form
      {...formItemLayout}
      onFinish={onFinish}
      form={form}
      layout="vertical"
      // initialValues={initialValues}
    >
      <Form.Item
        style={{ width: "100%" }}
        label="Order No"
        name="orderNo"
        rules={[{ required: true, message: "Please select Order No! " }]}
      >
        <Select
          showSearch
          onChange={orderNoChangeHandler}
          placeholder="Please select order No! "
          optionFilterProp="label"
          options={orders?.map((orderNo: string) => ({
            value: orderNo,
            label: orderNo,
          }))}
        />
      </Form.Item>
      {isLoading ? (
        <Loading />
      ) : result ? (
        <>
          <Form.Item
            label="Buyer"
            name="buyer"
            rules={[{ required: true, message: "Please input! Buyer" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="please input Buyer Name"
            />
          </Form.Item>
          <Form.Item
            label="Style no"
            name="styleNo"
            rules={[{ required: true, message: "Please input! Style no" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="please input Style no"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input! Description" }]}
          >
            <Input.TextArea
              style={{ width: "100%" }}
              disabled
              placeholder="please input Description "
            />
          </Form.Item>

          <Form.Item
            label="Order Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Please input! Order Quantity" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="please input Order Quantity number"
            />
          </Form.Item>
          <Form.Item
            label="Order place Date"
            name="date"
            rules={[{ required: true, message: "Please input! Date" }]}
          >
            <DatePicker disabled style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Shipment Date"
            name="shipmentDate"
            rules={[{ required: true, message: "Please input! shipment Date" }]}
          >
            <DatePicker disabled style={{ width: "100%" }} />
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
              disabled
              placeholder="please input Fabric Consumption (KG)"
            />
          </Form.Item>

          <Form.Item label="Total Fabric Required" name="totalFabric">
            <InputNumber style={{ width: "100%" }} disabled />
          </Form.Item>

          <Form.Item
            label="Fabric In House (KG)"
            name="fabricInHouse"
            rules={[
              { required: true, message: "Please Input Fabric In House (KG)" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="please input Fabric In House (KG)"
            />
          </Form.Item>

          <Form.Item
            label="Required Fabric"
            name="requiredFabric"
            rules={[
              { required: true, message: "Please Input Required Fabric " },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="please input Required Fabric"
            />
          </Form.Item>
          <Form.Item
            label="Cutting Completed (Per price)"
            name="cuttingCompleted"
            rules={[
              {
                required: true,
                message: "Please Input Cutting Completed (Per price)",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Cutting Completed (Per price)"
            />
          </Form.Item>
          <Form.Item
            label="Cutting Required"
            name="cuttingRequired"
            rules={[
              {
                required: true,
                message: "Please Input Cutting Required",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="Cutting Required"
            />
          </Form.Item>
          <Form.Item
            label="Delivery To Print (Per Price)"
            name="deliveryToPrint"
            rules={[
              {
                required: true,
                message: "Please Input Delivery To Print (Per Price)",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Delivery To Print (Per Price)"
            />
          </Form.Item>
          <Form.Item
            label="Delivery To Print Remaining (Per Price)"
            name="deliveryToPrintRemaining"
            rules={[
              {
                required: true,
                message: "Please Input Delivery To Print Remaining (Per Price)",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="Delivery To Print Remaining (Per Price)"
            />
          </Form.Item>
          <Form.Item
            label="Print Completed"
            name="printCompleted"
            rules={[
              {
                required: true,
                message: "Please Input Print Completed",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Print Completed"
            />
          </Form.Item>
          <Form.Item
            label="Print Receivable"
            name="printReceivable"
            rules={[
              {
                required: true,
                message: "Please Input Print Receivable",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="Print Receivable"
            />
          </Form.Item>
          <Form.Item
            label="sewing Input"
            name="sewingInput"
            rules={[
              {
                required: true,
                message: "Please Input sewing Input",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="sewing Input" />
          </Form.Item>
          <Form.Item
            label="sewing Input Remaining "
            name="sewingInputRemaining "
            rules={[
              {
                required: true,
                message: "Please sewing Input Remaining ",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="sewing Input Remaining"
            />
          </Form.Item>
          <Form.Item
            label="sewing Output "
            name="sewingOutput"
            rules={[
              {
                required: true,
                message: "Please sewing Output ",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="sewing Output"
            />
          </Form.Item>
          <Form.Item
            label="sewing Output Remaining "
            name="sewingOutputRemaining "
            rules={[
              {
                required: true,
                message: "Please sewing Output Remaining ",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="sewing Output Remaining"
            />
          </Form.Item>
          <Form.Item
            label="Finishing Output "
            name="finishingOutput"
            rules={[
              {
                required: true,
                message: "Please Finishing Output ",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Finishing Output"
            />
          </Form.Item>
          <Form.Item
            label="Finishing Output Remaining "
            name="finishingOutputRemaining "
            rules={[
              {
                required: true,
                message: "Please Finishing Output Remaining ",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="Finishing Output Remaining"
            />
          </Form.Item>
          <Form.Item
            label="Packing Completed "
            name="packingCompleted"
            rules={[
              {
                required: true,
                message: "Please Packing Completed ",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Packing Completed"
            />
          </Form.Item>
          <Form.Item
            label="Packing Remaining "
            name="packingRemaining "
            rules={[
              {
                required: true,
                message: "Please Packing Remaining ",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              disabled
              placeholder="Packing Remaining"
            />
          </Form.Item>
          <CustomInput
            label="Remark"
            name="remark"
            placeholder="Remarks"
            message="Please Enter Remarks"
          />
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add Production Report
            </Button>
          </Form.Item>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </Form>
  );
};

export default ProductionAddForm;
