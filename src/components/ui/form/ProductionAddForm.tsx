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
      deliveryToPrint,
      printCompleted,
      sewingInput,
      sewingOutput,
      finishingOutput,
      packingCompleted,
    } = allValues;

    if (result?.totalFabric && fabricInHouse) {
      const requiredFabric = result?.totalFabric - fabricInHouse;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        requiredFabric: Math.max(0, requiredFabric),
        // Clamp fabricInHouse between 0 and totalFabric
        fabricInHouse: Math.max(
          0,
          Math.min(fabricInHouse, result?.totalFabric)
        ),
      });
    } else {
      form.setFieldsValue({
        requiredFabric: 0,
      });
    }
    // cuttingRequired: result?.quantity - cuttingCompleted,

    if (result?.quantity && cuttingCompleted) {
      const cuttingRequired = result?.quantity - cuttingCompleted;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        cuttingRequired: Math.max(0, cuttingRequired),
        // Clamp fabricInHouse between 0 and totalFabric
        cuttingCompleted: Math.max(
          0,
          Math.min(cuttingCompleted, result?.quantity)
        ),
      });
    } else {
      form.setFieldsValue({
        cuttingRequired: 0,
      });
    }
    // deliveryToPrintRemaining: cuttingCompleted - deliveryToPrint,

    if (deliveryToPrint && cuttingCompleted) {
      const deliveryToPrintRemaining = cuttingCompleted - deliveryToPrint;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        deliveryToPrintRemaining: Math.max(0, deliveryToPrintRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        deliveryToPrint: Math.max(
          0,
          Math.min(deliveryToPrint, cuttingCompleted)
        ),
      });
    } else {
      form.setFieldsValue({
        deliveryToPrintRemaining: 0,
      });
    }
    // printReceivable: deliveryToPrint - printCompleted,

    if (deliveryToPrint && printCompleted) {
      const printReceivable = deliveryToPrint - printCompleted;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        printReceivable: Math.max(0, printReceivable),
        // Clamp fabricInHouse between 0 and totalFabric
        printCompleted: Math.max(0, Math.min(printCompleted, deliveryToPrint)),
      });
    } else {
      form.setFieldsValue({
        printReceivable: 0,
      });
    }
    // sewingInputRemaining: printCompleted - sewingInput,
    if (printCompleted && sewingInput) {
      const sewingInputRemaining = printCompleted - sewingInput;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        sewingInputRemaining: Math.max(0, sewingInputRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        sewingInput: Math.max(0, Math.min(sewingInput, printCompleted)),
      });
    } else {
      form.setFieldsValue({
        sewingInputRemaining: 0,
      });
    }
    // sewingOutputRemaining: sewingInput - sewingOutput,
    if (sewingInput && sewingOutput) {
      const sewingOutputRemaining = sewingInput - sewingOutput;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        sewingOutputRemaining: Math.max(0, sewingOutputRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        sewingOutput: Math.max(0, Math.min(sewingOutput, sewingInput)),
      });
    } else {
      form.setFieldsValue({
        sewingOutputRemaining: 0,
      });
    }
    // finishingOutputRemaining: sewingOutput - finishingOutput,
    if (sewingOutput && finishingOutput) {
      const finishingOutputRemaining = sewingOutput - finishingOutput;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        finishingOutputRemaining: Math.max(0, finishingOutputRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        finishingOutput: Math.max(0, Math.min(finishingOutput, sewingOutput)),
      });
    } else {
      form.setFieldsValue({
        finishingOutputRemaining: 0,
      });
    }
    // packingRemaining: finishingOutput - packingCompleted,
    if (finishingOutput && packingCompleted) {
      const packingRemaining = finishingOutput - packingCompleted;
      form.setFieldsValue({
        // Enforce min = 0 for requiredFabric
        packingRemaining: Math.max(0, packingRemaining),
        // Clamp fabricInHouse between 0 and totalFabric
        packingCompleted: Math.max(
          0,
          Math.min(packingCompleted, finishingOutput)
        ),
      });
    } else {
      form.setFieldsValue({
        packingRemaining: 0,
      });
    }
  };
  useEffect(() => {
    if (result) {
      form.setFieldsValue({
        buyer: result?.buyer,
        description: result?.description,
        orderDate: result?.orderDate ? moment(result?.orderDate) : undefined,
        date: result?.date ? dayjs(result?.date) : undefined,
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
    const res = await createProduction(values).unwrap();

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
                  <Col span={24} md={{ span: 12 }} key={index}>
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
