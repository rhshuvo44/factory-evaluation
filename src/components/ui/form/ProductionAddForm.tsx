import {
  Button,
  Col,
  Divider,
  Form,
  InputNumberProps,
  Row,
  Select,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";

import dayjs from "dayjs";
import {
  useGetAllOrderNoQuery,
  useSingleOrderQuery,
} from "../../../redux/features/order/orderApi";
import {
  useCreateProductionMutation,
  useOrderNoProductionQuery,
} from "../../../redux/features/productionReport/productionApi";
import {
  productionReportDisableFields,
  productionReportFields,
  TProductionReport,
} from "../../../types";
import RenderFormItem from "../../form/RenderFormItem";
import Loading from "../Loading";
const ProductionAddForm = () => {
  const [form] = Form.useForm();
  const [orderNo, setOrderNo] = useState<string>();

  // const { data: user } = useGetMeQuery(undefined);
  const queryParams = orderNo ? orderNo : undefined;

  const { data: allOrderNo } = useGetAllOrderNoQuery("");
  const orders = allOrderNo?.data;
  const { data: productionReport, isLoading: productionLoading } =
    useOrderNoProductionQuery(queryParams);
  const { data, isLoading } = useSingleOrderQuery(queryParams, {
    // enabled: productionReport?.data === undefined,
  });

  const result = productionReport?.data ?? data?.data;

  // const [createNotificationMutation] = useCreateNotificationMutation();
  const [createProduction] = useCreateProductionMutation();

  const orderNoChangeHandler: InputNumberProps["onChange"] = (values) => {
    setOrderNo(values as string);
  };

  const handleValuesChange = (
    _: TProductionReport,
    allValues: TProductionReport
  ) => {
    const {
      fabricInHouse,
      cuttingCompleted,

      todayFabricInHouse,
      todayCuttingCompleted,
      todayDeliveryToPrint,
      todayPrintCompleted,
      todaySewingInput,
      todaySewingOutput,
      todayFinishingOutput,
      todayPackingCompleted,
    } = allValues;

    if (result?.totalFabric && todayFabricInHouse) {
      const requiredFabric =
        result?.totalFabric - fabricInHouse - todayFabricInHouse;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        requiredFabric: Math.max(0, requiredFabric),
        // Clamp todayFabricInHouse between 0 and totalFabric
        todayFabricInHouse: Math.max(
          0,
          Math.min(todayFabricInHouse, result?.requiredFabric)
        ),
      });
    } else {
      form.setFieldsValue({
        requiredFabric: result?.requiredFabric,
      });
    }
    // cuttingRequired: result?.quantity - cuttingCompleted,

    if (result?.quantity && todayCuttingCompleted) {
      const cuttingRequired =
        result?.quantity - cuttingCompleted - todayCuttingCompleted;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        cuttingRequired: Math.max(0, cuttingRequired),
        // Clamp fabricInHouse between 0 and totalFabric
        todayCuttingCompleted: Math.max(
          0,
          Math.min(todayCuttingCompleted, result?.cuttingRequired)
        ),
      });
    } else {
      form.setFieldsValue({
        cuttingRequired: result?.cuttingRequired,
      });
    }
    // deliveryToPrintRemaining: cuttingCompleted - deliveryToPrint,

    if (todayDeliveryToPrint && todayCuttingCompleted) {
      const deliveryToPrintRemaining =
        todayCuttingCompleted -
        todayDeliveryToPrint +
        result?.deliveryToPrintRemaining;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        deliveryToPrintRemaining: Math.max(0, deliveryToPrintRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        todayDeliveryToPrint: Math.max(
          0,
          Math.min(
            todayDeliveryToPrint,
            todayCuttingCompleted + result?.deliveryToPrintRemaining
          )
        ),
      });
    } else {
      form.setFieldsValue({
        deliveryToPrintRemaining:
          result?.deliveryToPrintRemaining + todayCuttingCompleted,
      });
    }

    // printReceivable: deliveryToPrint - printCompleted,

    if (todayDeliveryToPrint && todayPrintCompleted) {
      const printReceivable =
        todayDeliveryToPrint - todayPrintCompleted + result?.printReceivable;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        printReceivable: Math.max(0, printReceivable),
        // Clamp fabricInHouse between 0 and totalFabric
        todayPrintCompleted: Math.max(
          0,
          Math.min(
            todayPrintCompleted,
            result?.printReceivable + todayDeliveryToPrint
          )
        ),
      });
    } else {
      form.setFieldsValue({
        printReceivable: result?.printReceivable + todayDeliveryToPrint,
      });
    }
    // sewingInputRemaining: printCompleted - sewingInput,
    if (todayPrintCompleted && todaySewingInput) {
      const sewingInputRemaining =
        todayPrintCompleted - todaySewingInput + result?.sewingInputRemaining;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        sewingInputRemaining: Math.max(0, sewingInputRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        todaySewingInput: Math.max(
          0,
          Math.min(
            todaySewingInput,
            result?.sewingInputRemaining + todayPrintCompleted
          )
        ),
      });
    } else {
      form.setFieldsValue({
        sewingInputRemaining:
          result?.sewingInputRemaining + todayPrintCompleted,
      });
    }
    // sewingOutputRemaining: sewingInput - sewingOutput,
    if (todaySewingInput && todaySewingOutput) {
      const sewingOutputRemaining =
        todaySewingInput - todaySewingOutput + result?.sewingOutputRemaining;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        sewingOutputRemaining: Math.max(0, sewingOutputRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        todaySewingOutput: Math.max(
          0,
          Math.min(
            todaySewingOutput,
            result?.sewingOutputRemaining + todaySewingInput
          )
        ),
      });
    } else {
      form.setFieldsValue({
        sewingOutputRemaining: result?.sewingOutputRemaining + todaySewingInput,
      });
    }
    // finishingOutputRemaining: sewingOutput - finishingOutput,
    if (todaySewingOutput && todayFinishingOutput) {
      const finishingOutputRemaining =
        todaySewingOutput -
        todayFinishingOutput +
        result?.finishingOutputRemaining;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        finishingOutputRemaining: Math.max(0, finishingOutputRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        todayFinishingOutput: Math.max(
          0,
          Math.min(
            todayFinishingOutput,
            result?.finishingOutputRemaining + todaySewingOutput
          )
        ),
      });
    } else {
      form.setFieldsValue({
        finishingOutputRemaining:
          result?.finishingOutputRemaining + todaySewingOutput,
      });
    }
    // packingRemaining: finishingOutput - packingCompleted,
    if (todayFinishingOutput && todayPackingCompleted) {
      const packingRemaining =
        todayFinishingOutput - todayPackingCompleted + result?.packingRemaining;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        packingRemaining: Math.max(0, packingRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        todayPackingCompleted: Math.max(
          0,
          Math.min(
            todayPackingCompleted,
            result?.packingRemaining + todayFinishingOutput
          )
        ),
      });
    } else {
      form.setFieldsValue({
        packingRemaining: result?.packingRemaining + todayFinishingOutput,
      });
    }
  };
  // const date = dayjs(result?.date);
  useEffect(() => {
    if (result) {
      form.setFieldsValue({
        buyer: result?.buyer,
        description: result?.description,
        orderDate: result?.orderDate ? moment(result?.orderDate) : undefined,

        orderNo: result?.orderNo,
        quantity: result?.quantity,
        styleNo: result?.styleNo,
        shipmentDate: result?.shipmentDate
          ? moment(result?.shipmentDate)
          : undefined,
        leadTime: result?.leadTime,
        fabricConsumption: result?.fabricConsumption,
        finishingOutput: result?.finishingOutput,
        totalFabric: result?.totalFabric,
        fabricInHouse: result?.fabricInHouse,
        cuttingCompleted: result?.cuttingCompleted,
        cuttingRequired: result?.cuttingRequired,
        printCompleted: result?.printCompleted,
        deliveryToPrint: result?.deliveryToPrint,
        deliveryToPrintRemaining: result?.deliveryToPrintRemaining,
        sewingInput: result?.sewingInput,
        finishingOutputRemaining: result?.finishingOutputRemaining,
        packingCompleted: result?.packingCompleted,
        packingRemaining: result?.packingRemaining,
        printReceivable: result?.printReceivable,
        requiredFabric: result?.requiredFabric,
        sewingInputRemaining: result?.sewingInputRemaining,
        sewingOutput: result?.sewingOutput,
        sewingOutputRemaining: result?.sewingOutputRemaining,
        remark: result?.remark,
        todayFabricInHouse: 0,
        todayCuttingCompleted: 0,
        todayDeliveryToPrint: 0,
        todayPrintCompleted: 0,
        todaySewingInput: 0,
        todaySewingOutput: 0,
        todayFinishingOutput: 0,
        todayPackingCompleted: 0,
      });
    }
  }, [form, result]);

  const onFinish = async (values: TProductionReport) => {
    if (values.date) {
      values.date = dayjs(values.date).format("YYYY-MM-DD");
    }
    if (values.orderDate) {
      values.orderDate = dayjs(values.orderDate).format("YYYY-MM-DD");
    }
    if (values.shipmentDate) {
      values.shipmentDate = dayjs(values.shipmentDate).format("YYYY-MM-DD");
    }

    const productionReportData = {
      ...values,
      packingCompleted:
        values.packingCompleted + (values?.todayPackingCompleted ?? 0),
      fabricInHouse: values.fabricInHouse + (values?.todayFabricInHouse ?? 0),
      cuttingCompleted:
        values.cuttingCompleted + (values?.todayCuttingCompleted ?? 0),
      deliveryToPrint:
        values.deliveryToPrint + (values?.todayDeliveryToPrint ?? 0),
      printCompleted:
        values.printCompleted + (values?.todayPrintCompleted ?? 0),
      sewingInput: values.sewingInput + (values?.todaySewingInput ?? 0),
      sewingOutput: values.sewingOutput + (values?.todaySewingOutput ?? 0),
      finishingOutput:
        values.finishingOutput + (values?.todayFinishingOutput ?? 0),
    };
    const res = await createProduction(productionReportData).unwrap();

    if (!res.success) return toast.error(res.message);
    toast.success("Create Production Report successfully");
    // form.resetFields();
    // Check if user role is admin before creating a notification
    // if (user?.data?.role === userRole.Coordinator) {
    //   const notify = {
    //     message: `New production Report Generate created by ${user?.data?.name}`,
    //     date: moment(),
    //   };
    //   await createNotificationMutation(notify);
    // }
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
          layout="vertical"
          // initialValues={initialValues}
          onValuesChange={handleValuesChange}
        >
          <Row gutter={[16, 16]}>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                style={{ width: "100%" }}
                label="Order No"
                name="orderNo"
                rules={[
                  { required: true, message: "Please select Order No! " },
                ]}
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
            </Col>
          </Row>
          <Divider />
          {isLoading || productionLoading ? (
            <Loading />
          ) : result ? (
            <>
              <Row gutter={16}>
                {productionReportDisableFields?.map((field, index) => (
                  <Col span={24} md={{ span: 8 }} lg={{ span: 6 }} key={index}>
                    {RenderFormItem(field)}
                  </Col>
                ))}
              </Row>
              <Divider />
              <Row gutter={16}>
                {productionReportFields?.map((field, index) => (
                  <Col span={24} md={{ span: 8 }} key={index}>
                    {RenderFormItem(field)}
                  </Col>
                ))}
              </Row>

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
      </Col>
    </Row>
  );
};

export default ProductionAddForm;
