import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateBuyerDevelopmentMutation } from "../../../redux/features/buyerDevelopment/buyerDevelopmentApi";
import { buyerDevelopmentFields } from "../../../types";
import { TBuyer } from "../../../types/tableType";
import RenderFormItem from "../../form/RenderFormItem";

const BuyerDevelopmentAdd = () => {
  const [form] = Form.useForm();
  const [createBuyerDevelopmentMutation] = useCreateBuyerDevelopmentMutation();

  const handleValuesChange = (_: TBuyer, allValues: TBuyer) => {
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
      quantity: 0,
    });
  };
  const onFinish = async (values: TBuyer) => {
    if (values.date) {
      values.date = dayjs(values.date).format("YYYY-MM-DD");
    }
    const res = await createBuyerDevelopmentMutation(values).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Buyer Development Cost successfully");
    form.resetFields();
  };

  return (
    <Row>
      <Col span={24}>
        <Form
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
          layout="vertical"
          onValuesChange={handleValuesChange}
        >
          <Row gutter={10}>
            {buyerDevelopmentFields?.map((field, index) => (
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

export default BuyerDevelopmentAdd;
