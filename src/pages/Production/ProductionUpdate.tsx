import { Button, Col, Divider, Form, Input, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RenderFormItem from "../../components/form/RenderFormItem";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useSingleProductionQuery,
  useUpdateProductionMutation,
} from "../../redux/features/productionReport/productionApi";
import {
  productionReportDisableFields,
  productionReportUpdateFields,
  TProductionReport,
} from "../../types";
import dayjs from "dayjs";

const ProductionUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleProductionQuery(id);
  const [updateProduction] = useUpdateProductionMutation();
  const result = data?.data;

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
        date: dayjs(result?.date),
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

  if (isLoading) return <Loading />;
  const onFinish = async (values: TProductionReport) => {
    const updateData = {
      id,
      data: { ...values },
    };
    const res = await updateProduction(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Production successfully");
    navigate(-1);
  };
  return (
    <Row justify="center">
      <SectionTitle title="Production Report update" />
      <Col span={24}>
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
          layout="vertical"
          // initialValues={initialValues}
          onValuesChange={handleValuesChange}
        >
          <Row gutter={16}>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                style={{ width: "100%" }}
                label="Order No"
                name="orderNo"
                rules={[
                  { required: true, message: "Please select Order No! " },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  disabled
                  placeholder="Please select order No!"
                />
              </Form.Item>
            </Col>
            {productionReportDisableFields?.map((field, index) => (
              <Col span={24} md={{ span: 8 }} lg={{ span: 6 }} key={index}>
                {RenderFormItem(field)}
              </Col>
            ))}
          </Row>
          <Divider />
          <Row gutter={16}>
            {productionReportUpdateFields?.map((field, index) => (
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
        </Form>
      </Col>
    </Row>
  );
};

export default ProductionUpdate;
