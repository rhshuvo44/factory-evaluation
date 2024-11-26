import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateTravelMutation } from "../../../redux/features/travelling/travellingApi";
import { travellingFields } from "../../../types";
import { TTravel } from "../../../types/tableType";
import RenderFormItem from "../../form/RenderFormItem";
const TravellingForm = () => {
  const [form] = Form.useForm();

  const [createTravel] = useCreateTravelMutation();

  const handleValuesChange = (_: TTravel, allValues: TTravel) => {
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
  const onFinish = async (values: TTravel) => {
    if (values.date) {
      values.date = dayjs(values.date).format("YYYY-MM-DD");
    }
    const res = await createTravel(values).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Travelling Allowance successfully");
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
            {travellingFields?.map((field, index) => (
              <Col xs={24} md={8} key={index}>
                {RenderFormItem(field)}
              </Col>
            ))}
            <Col span={24}>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default TravellingForm;
