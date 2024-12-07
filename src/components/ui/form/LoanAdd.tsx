import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateLoanMutation } from "../../../redux/features/loan/loanApi";
import { loanFields } from "../../../types";
import { TLoan } from "../../../types/tableType";
import RenderFormItem from "../../form/RenderFormItem";

const LoanAdd = () => {
  const [form] = Form.useForm();

  const [createLoanMutation] = useCreateLoanMutation();
  const handleValuesChange = (_: TLoan, allValues: TLoan) => {
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
      remark: "no cost",
      buyerId: 0,
      orderNo: 0,
      memoNo: 0,
      unit: 0,
      unitPrice: 0,
      totalPrice: 0,
      quantity: 0,
      orderedBy: "M.D",
      particulars: "Loan Return",
      description: "No Loan Return",
      payTo: "M.D",
      paymentType: "cash",
    });
  };
  const onFinish = async (values: TLoan) => {
    if (values.date) {
      values.date = dayjs(values.date).format("YYYY-MM-DD");
    }
    const res = await createLoanMutation(values).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success(res.message);
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
          initialValues={{ particulars: "Loan Return" }}
          onValuesChange={handleValuesChange}
        >
          <Row gutter={10}>
            {loanFields?.map((field, index) => (
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

export default LoanAdd;
