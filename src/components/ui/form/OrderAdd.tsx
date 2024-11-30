import { Button, Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";

import dayjs from "dayjs";
import moment from "moment";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateOrderMutation } from "../../../redux/features/order/orderApi";
import { orderFields } from "../../../types";
import { TOrderAdd } from "../../../types/tableType";
import RenderFormItem from "../../form/RenderFormItem";

const OrderAdd = () => {
  const [form] = Form.useForm();

  const [style, setStyle] = useState<string>("");
  const [item, setItem] = useState<string>("");

  const [createOrderMutation] = useCreateOrderMutation();

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

  const handleValuesChange = (_: TOrderAdd, allValues: TOrderAdd) => {
    const { fabricConsumption, quantity, orderDate, shipmentDate } = allValues;

    // Calculate totalPrice if both unit and unitPrice are present
    if (fabricConsumption && quantity) {
      form.setFieldsValue({
        totalFabric: parseFloat(
          ((fabricConsumption / 12) * quantity).toFixed(2)
        ),
      });
    } else {
      form.setFieldsValue({
        totalFabric: 0,
      });
    }

    // Calculate leadTime
    if (orderDate && shipmentDate) {
      const startDate = dayjs(orderDate).format("YYYY-MM-DD");
      const endDate = dayjs(shipmentDate).format("YYYY-MM-DD");
      calculateLeadTime(startDate, endDate);
    }
  };

  const handleStyleChange = (value: string) => {
    setStyle(value);
  };
  const handleItemChange = (value: string) => {
    setItem(value);
  };

  const onFinish = async (values: TOrderAdd) => {
    let styleNo;
    if (style && item) {
      styleNo = style + item + values.styleNo;
    }
    const orderNo = "sta-" + values.orderNo;
    if (values.orderDate) {
      values.orderDate = dayjs(values.orderDate).format("YYYY-MM-DD");
    }
    if (values.shipmentDate) {
      values.shipmentDate = dayjs(values.shipmentDate).format("YYYY-MM-DD");
    }
    const res = await createOrderMutation({
      ...values,
      orderNo,
      styleNo,
    }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Order successfully");
    form.resetFields();
  };
  return (
    <Row justify="center">
      <Col span={24}>
        <Form
          {...formItemLayout}
          layout="vertical"
          onFinish={onFinish}
          form={form}
          onValuesChange={handleValuesChange}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item
                label="Style no"
                style={{ marginBottom: 20, display: "block" }}
                rules={[{ required: true }]}
              >
                <Row gutter={10}>
                  <Col span={24} md={{ span: 8 }}>
                    <Form.Item name="style" rules={[{ required: true }]}>
                      <Select
                        placeholder="Select a style"
                        onChange={handleStyleChange}
                        style={{ width: "100%" }}
                        options={[
                          { value: "1", label: "Men's" },
                          { value: "2", label: "Ladies" },
                          { value: "3", label: "Boys" },
                          { value: "4", label: "Girls" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={{ span: 8 }}>
                    <Form.Item name="item" rules={[{ required: true }]}>
                      <Select
                        placeholder="Select an item"
                        disabled={!style}
                        onChange={handleItemChange}
                        style={{ width: "100%" }}
                        options={[
                          { value: "1", label: "Top" },
                          { value: "2", label: "Bottom" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={{ span: 8 }}>
                    <Form.Item name="styleNo" rules={[{ required: true }]}>
                      <Input
                        addonBefore={style + item}
                        disabled={!item}
                        placeholder="Please enter Style No"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 8 }}>
              <Form.Item
                label="Order No"
                validateTrigger="onBlur"
                name="orderNo"
                rules={[{ required: true, message: "Please input order no" }]}
              >
                <Input
                  addonBefore="sta-"
                  placeholder="please input order number"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            {orderFields?.map((field, index) => (
              <Col xs={24} md={8} key={index}>
                {RenderFormItem(field)}
              </Col>
            ))}
            <Col span={24}>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Add Order
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default OrderAdd;
