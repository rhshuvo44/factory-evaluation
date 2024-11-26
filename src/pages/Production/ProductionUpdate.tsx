import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  InputNumberProps,
  Row,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInput from "../../components/form/CustomInput";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useSingleProductionQuery,
  useUpdateProductionMutation,
} from "../../redux/features/productionReport/productionApi";
import { TProductionReport } from "../../types";

const ProductionUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [inHouse, setInHouse] = useState<number>(0);
  const [cuttingCompleted, setCuttingCompleted] = useState<number>(0);
  const [printCompleted, setPrintCompleted] = useState<number>(0);
  const [deliveryToPrint, setDeliveryToPrint] = useState<number>(0);
  const [sewingInput, setSewingInput] = useState<number>(0);
  const [sewingOutput, setSewingOutput] = useState<number>(0);
  const [finishingOutput, setFinishingOutput] = useState<number>(0);
  const [packingCompleted, setPackingCompleted] = useState<number>(0);
  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleProductionQuery(id);
  const [updateProduction] = useUpdateProductionMutation();
  const production = data?.data;
  const inHouseChangeHandler: InputNumberProps["onChange"] = (values) => {
    setInHouse(values as number);
  };
  const cuttingCompletedChangeHandler: InputNumberProps["onChange"] = (
    values
  ) => {
    setCuttingCompleted(values as number);
  };
  const printCompletedChangeHandler: InputNumberProps["onChange"] = (
    values
  ) => {
    setPrintCompleted(values as number);
  };
  const deliveryToPrintChangeHandler: InputNumberProps["onChange"] = (
    values
  ) => {
    setDeliveryToPrint(values as number);
  };
  const sewingInputChangeHandler: InputNumberProps["onChange"] = (values) => {
    setSewingInput(values as number);
  };
  const sewingOutputChangeHandler: InputNumberProps["onChange"] = (values) => {
    setSewingOutput(values as number);
  };
  const finishingOutputChangeHandler: InputNumberProps["onChange"] = (
    values
  ) => {
    setFinishingOutput(values as number);
  };
  const packingCompletedChangeHandler: InputNumberProps["onChange"] = (
    values
  ) => {
    setPackingCompleted(values as number);
  };

  useEffect(() => {
    if (production) {
      form.setFieldsValue({
        buyer: production?.buyer,
        description: production?.description,
        date: production?.date ? moment(production?.date) : undefined,
        orderNo: production?.orderNo,
        quantity: production?.quantity,
        styleNo: production?.styleNo,
        shipmentDate: production?.shipmentDate
          ? moment(production?.shipmentDate)
          : undefined,
        leadTime: production?.leadTime,
        fabricConsumption: production?.fabricConsumption,
        totalFabric: production?.totalFabric,
      });
    }
    const inHouseValue = inHouse || production?.fabricInHouse;
    const requiredFabricCalculator =
      production?.totalFabric - inHouseValue || production?.requiredFabric;
    const cuttingCompletedValue =
      cuttingCompleted || production?.cuttingCompleted;
    const cuttingRequiredCalculator =
      production?.quantity - cuttingCompletedValue ||
      production?.cuttingRequired;
    const deliveryToPrintValue = deliveryToPrint || production?.deliveryToPrint;
    const deliveryToPrintRemainingCalculator =
      cuttingCompletedValue - deliveryToPrintValue ||
      production?.deliveryToPrintRemaining;
    const printCompletedValue = printCompleted || production?.printCompleted;
    const printReceivableCalculator =
      deliveryToPrintValue - printCompletedValue || production?.printReceivable;
    const sewingInputValue = sewingInput || production?.sewingInput;
    const sewingInputRemainingCalculator =
      printCompletedValue - sewingInputValue ||
      production?.sewingInputRemaining;
    const sewingOutputValue = sewingOutput || production?.sewingOutput;
    const sewingOutputRemainingCalculator =
      sewingInputValue - sewingOutputValue || production?.sewingOutputRemaining;

    const finishingOutputValue = finishingOutput || production?.finishingOutput;
    const finishingOutputRemainingCalculator =
      sewingOutputValue - finishingOutputValue ||
      production?.finishingOutputRemaining;
    const packingCompletedValue =
      packingCompleted || production?.packingCompleted;
    const packingRemainingCalculator =
      finishingOutputValue - packingCompletedValue ||
      production?.packingRemaining;

    form.setFieldsValue({
      requiredFabric: requiredFabricCalculator,
      cuttingRequired: cuttingRequiredCalculator,
      deliveryToPrintRemaining: deliveryToPrintRemainingCalculator,
      printReceivable: printReceivableCalculator,
      sewingInputRemaining: sewingInputRemainingCalculator,
      sewingOutputRemaining: sewingOutputRemainingCalculator,
      finishingOutputRemaining: finishingOutputRemainingCalculator,
      packingRemaining: packingRemainingCalculator,
    });
  }, [
    form,
    production,
    inHouse,
    cuttingCompleted,
    deliveryToPrint,
    printCompleted,
    sewingInput,
    sewingOutput,
    finishingOutput,
    packingCompleted,
  ]);
  const initialValues = {
    fabricInHouse: production?.fabricInHouse,
    cuttingCompleted: production?.cuttingCompleted,
    printCompleted: production?.printCompleted,
    deliveryToPrint: production?.deliveryToPrint,
    sewingInput: production?.sewingInput,
    sewingOutput: production?.sewingOutput,
    finishingOutput: production?.finishingOutput,
    packingCompleted: production?.packingCompleted,
    remark: production?.remark,
  };
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
          initialValues={initialValues}
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
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Buyer Name"
                name="buyer"
                rules={[{ required: true, message: "Please input! Buyer" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled
                  placeholder="please input Buyer Name"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
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
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input! Description" },
                ]}
              >
                <Input.TextArea
                  style={{ width: "100%" }}
                  disabled
                  placeholder="please input Description "
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Order Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input! Order Quantity",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled
                  placeholder="please input Order Quantity number"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Order Date"
                name="date"
                rules={[{ required: true, message: "Please input! Date" }]}
              >
                <DatePicker disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Shipment Date"
                name="shipmentDate"
                rules={[
                  {
                    required: true,
                    message: "Please input! shipment Date",
                  },
                ]}
              >
                <DatePicker disabled style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item label="Lead Time" name="leadTime">
                <Input style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
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
            </Col>

            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item label="Total Fabric Required" name="totalFabric">
                <InputNumber style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>

            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Required Fabric"
                name="requiredFabric"
                rules={[
                  {
                    required: true,
                    message: "Please Input Required Fabric ",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled
                  placeholder="please input Required Fabric"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
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
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Delivery To Print Remaining (Per Price)"
                name="deliveryToPrintRemaining"
                rules={[
                  {
                    required: true,
                    message:
                      "Please Input Delivery To Print Remaining (Per Price)",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  disabled
                  placeholder="Delivery To Print Remaining (Per Price)"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
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
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="sewing Input Remaining "
                name="sewingInputRemaining"
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
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="sewing Output Remaining"
                name="sewingOutputRemaining"
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
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Finishing Output Remaining "
                name="finishingOutputRemaining"
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
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Packing Remaining "
                name="packingRemaining"
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
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Fabric In House (KG)"
                name="fabricInHouse"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: "Please Input Fabric In House (KG)",
                  },
                ]}
              >
                <InputNumber
                  onChange={inHouseChangeHandler}
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="please input Fabric In House (KG)"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                label="Cutting Completed (Per price)"
                name="cuttingCompleted"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: "Please Input Cutting Completed (Per price)",
                  },
                ]}
              >
                <InputNumber
                  onChange={cuttingCompletedChangeHandler}
                  style={{ width: "100%" }}
                  max={production?.quantity}
                  min={0}
                  placeholder="Cutting Completed (Per price)"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                validateTrigger="onBlur"
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
                  max={cuttingCompleted}
                  min={0}
                  onChange={deliveryToPrintChangeHandler}
                  placeholder="Delivery To Print (Per Price)"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                validateTrigger="onBlur"
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
                  onChange={printCompletedChangeHandler}
                  min={0}
                  max={deliveryToPrint}
                  style={{ width: "100%" }}
                  placeholder="Print Completed"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                validateTrigger="onBlur"
                label="sewing Input"
                name="sewingInput"
                rules={[
                  {
                    required: true,
                    message: "Please Input sewing Input",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={printCompleted}
                  onChange={sewingInputChangeHandler}
                  style={{ width: "100%" }}
                  placeholder="sewing Input"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                validateTrigger="onBlur"
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
                  min={0}
                  max={sewingInput}
                  onChange={sewingOutputChangeHandler}
                  style={{ width: "100%" }}
                  placeholder="sewing Output"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                validateTrigger="onBlur"
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
                  max={sewingOutput}
                  onChange={finishingOutputChangeHandler}
                  placeholder="Finishing Output"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <Form.Item
                validateTrigger="onBlur"
                label="Packing Completed "
                name="packingCompleted"
                rules={[
                  {
                    required: true,
                    message: "Please Packing Completed ",
                  },
                  {
                    validator: (_, value: number | undefined) => {
                      if (value === undefined || value === null) {
                        return Promise.resolve();
                      }
                      if (value < 0) {
                        return Promise.reject(
                          new Error("Value cannot be less than 0")
                        );
                      }
                      if (value > finishingOutput) {
                        return Promise.reject(
                          new Error(`Value cannot exceed ${finishingOutput}`)
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  max={finishingOutput}
                  onChange={packingCompletedChangeHandler}
                  placeholder="Packing Completed"
                  // onBlur={(e) => {
                  //   const value = (e.target as HTMLInputElement)
                  //     .valueAsNumber;
                  //   if (value < 0 || value > finishingOutput) {
                  //     console.error("Value out of range");
                  //   }
                  // }}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
              <CustomInput
                label="Remark"
                name="remark"
                placeholder="Remarks"
                message="Please Enter Remarks"
              />
            </Col>
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
