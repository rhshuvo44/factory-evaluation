import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RenderFormItem from "../../components/form/RenderFormItem";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useSingleProductionCostQuery,
  useUpdateProductionCostMutation,
} from "../../redux/features/productionCost/productionCostApi";
import { productionCostFields, TProductionCost } from "../../types";

const ProductionCostUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleProductionCostQuery(id);
  const [updateProductionCost] = useUpdateProductionCostMutation();
  const result = data?.data;

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
  const initialValues = {
    buyerId: result?.buyerId,
    description: result?.description,
    orderNo: result?.orderNo,
    particulars: result?.particulars,
    payTo: result?.payTo,
    memoNo: result?.memoNo,
    paymentType: result?.paymentType,
    remark: result?.remark,
    unit: result?.unit,
    date: result?.date ? dayjs(result?.date) : undefined,
    unitPrice: result?.unitPrice,
    totalPrice: result?.totalPrice,
  };

  if (isLoading) return <Loading />;

  const onFinish = async (values: TProductionCost) => {
    const totalPrice = isNaN(values.totalPrice) ? 0 : values.totalPrice;
    const updateData = {
      id,
      data: { ...values, totalPrice },
    };
    const res = await updateProductionCost(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Production Cost successfully");
    navigate(-1);
  };
  return (
    <Row justify="center">
      <SectionTitle title="Production Cost Update" />
      <Col span={24}>
        <Form
          layout="vertical"
          form={form}
          name="Production Cost update form"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={initialValues}
          onValuesChange={handleValuesChange}
        >
          <Row gutter={10}>
            {productionCostFields?.map((field, index) => (
              <Col xs={24} md={8} key={index}>
                {RenderFormItem(field)}
              </Col>
            ))}
          </Row>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ProductionCostUpdate;
