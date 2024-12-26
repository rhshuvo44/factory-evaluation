import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateProductionCostMutation } from "../../../redux/features/productionCost/productionCostApi";
import { productionCostFields } from "../../../types";
import { TProductionCost, TTravel } from "../../../types/tableType";
import RenderFormItem from "../../form/RenderFormItem";
const ProductionCostAddForm = () => {
  const [form] = Form.useForm();

  const [createProductionCost] = useCreateProductionCostMutation();

  const handleValuesChange = (
    _: TProductionCost,
    allValues: TProductionCost
  ) => {
    const { unit, unitPrice } = allValues;
    // Calculate totalPrice if both unit and unitPrice are present
    if (unit && unitPrice) {
      form.setFieldsValue({
        totalPrice: unit * unitPrice,
      });
    } else {
      form.setFieldsValue({
        totalPrice: 0,
      });
    }
  };
  const onFill = () => {
    form.setFieldsValue({
      date: dayjs(),
      particulars: "no cost",
      description: "no cost",
      remark: "no cost",
      buyerId: 0,
      orderNo: 0,
      memoNo: 0,
      payTo: "no cost",
      paymentType: "Once",
      unit: 0,
      unitPrice: 0,
      totalPrice: 0,
    });
  };
  const onFinish = async (values: TTravel) => {
    if (values.date) {
      values.date = dayjs(values.date).format("YYYY-MM-DD");
    }
    const res = await createProductionCost(values).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Production Cost successfully");
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
            {productionCostFields?.map((field, index) => (
              <Col xs={24} md={8} key={index}>
                {RenderFormItem(field)}
              </Col>
            ))}
            <Col span={24}>
              <Row>
                <Col>
                  <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={onFill}>
                      No Cost For Today
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ProductionCostAddForm;
