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
import { userRole } from "../../../constants/userRole";

import dayjs from "dayjs";
import { useCreateNotificationMutation } from "../../../redux/features/notification/notificationApi";
import {
  useGetAllOrderNoQuery,
  useSingleOrderQuery,
} from "../../../redux/features/order/orderApi";
import {
  useCreateProductionMutation,
  useOrderNoProductionQuery,
} from "../../../redux/features/productionReport/productionApi";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
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
  // const [inHouse, setInHouse] = useState<number>(0);
  // const [cuttingCompleted, setCuttingCompleted] = useState<number>(0);
  // const [printCompleted, setPrintCompleted] = useState<number>(0);
  // const [deliveryToPrint, setDeliveryToPrint] = useState<number>(0);
  // const [sewingInput, setSewingInput] = useState<number>(0);
  // const [sewingOutput, setSewingOutput] = useState<number>(0);
  // const [finishingOutput, setFinishingOutput] = useState<number>(0);
  // const [packingCompleted, setPackingCompleted] = useState<number>(0);

  const { data: user } = useGetMeQuery(undefined);
  const queryParams = orderNo ? orderNo : undefined;

  const { data: allOrderNo } = useGetAllOrderNoQuery("");
  const orders = allOrderNo?.data;
  const { data: productionReport, isLoading: productionLoading } =
    useOrderNoProductionQuery(queryParams);
  const { data, isLoading } = useSingleOrderQuery(queryParams, {
    // enabled: productionReport?.data === undefined,
  });

  const result = productionReport?.data ?? data?.data;

  const [createNotificationMutation] = useCreateNotificationMutation();
  const [createProduction] = useCreateProductionMutation();

  const orderNoChangeHandler: InputNumberProps["onChange"] = (values) => {
    setOrderNo(values as string);
  };
  // const inHouseChangeHandler: InputNumberProps["onChange"] = (values) => {
  //   setInHouse(values as number);
  // };
  // const cuttingCompletedChangeHandler: InputNumberProps["onChange"] = (
  //   values
  // ) => {
  //   setCuttingCompleted(values as number);
  // };
  // const printCompletedChangeHandler: InputNumberProps["onChange"] = (
  //   values
  // ) => {
  //   setPrintCompleted(values as number);
  // };
  // const deliveryToPrintChangeHandler: InputNumberProps["onChange"] = (
  //   values
  // ) => {
  //   setDeliveryToPrint(values as number);
  // };
  // const sewingInputChangeHandler: InputNumberProps["onChange"] = (values) => {
  //   setSewingInput(values as number);
  // };
  // const sewingOutputChangeHandler: InputNumberProps["onChange"] = (values) => {
  //   setSewingOutput(values as number);
  // };
  // const finishingOutputChangeHandler: InputNumberProps["onChange"] = (
  //   values
  // ) => {
  //   setFinishingOutput(values as number);
  // };
  // const packingCompletedChangeHandler: InputNumberProps["onChange"] = (
  //   values
  // ) => {
  //   setPackingCompleted(values as number);
  // };
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
    const date = new Date().toLocaleDateString();
    if (values.orderDate) {
      values.orderDate = dayjs(values.orderDate).format("YYYY-MM-DD");
    }
    if (values.shipmentDate) {
      values.shipmentDate = dayjs(values.shipmentDate).format("YYYY-MM-DD");
    }
    const res = await createProduction({ ...values, date }).unwrap();

    if (!res.success) return toast.error(res.message);
    toast.success("Create Production Report successfully");
    form.resetFields();
    // Check if user role is admin before creating a notification
    if (user?.data?.role === userRole.Coordinator) {
      const notify = {
        message: `New production Report Generate created by ${user?.data?.name}`,
        date: moment(),
      };
      await createNotificationMutation(notify);
    }
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
                {/* <Col span={24} md={{ span: 8 }} lg={{ span: 6 }}>
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
                    rules={[
                      { required: true, message: "Please input! Style no" },
                    ]}
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
                </Col> */}
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
                {/* <Col span={24} md={{ span: 12 }}>
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
                <Col span={24} md={{ span: 12 }}>
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
                      max={result?.totalFabric}
                      style={{ width: "100%" }}
                      placeholder="please input Fabric In House (KG)"
                    />
                  </Form.Item>
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                      max={result?.quantity}
                      min={0}
                      placeholder="Cutting Completed (Per price)"
                    />
                  </Form.Item>
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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
                <Col span={24} md={{ span: 12 }}>
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
                </Col> */}
                {/* <Col span={24} md={{ span: 12 }}>
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

                <Col span={24} md={{ span: 12 }}>
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
                              new Error(
                                `Value cannot exceed ${finishingOutput}`
                              )
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
                <Col span={24} md={{ span: 12 }}>
                  <CustomInput
                    label="Remark"
                    name="remark"
                    placeholder="Remarks"
                    message="Please Enter Remarks"
                  />
                </Col> */}
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
