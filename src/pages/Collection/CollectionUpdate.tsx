import { Button, Col, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RenderFormItem from "../../components/form/RenderFormItem";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useSingleCollectionQuery,
  useUpdateCollectionMutation,
} from "../../redux/features/collection/collectionApi";
import { CollectionFields, TCollection } from "../../types";

const CollectionUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleCollectionQuery(id);
  const [updateCollection] = useUpdateCollectionMutation();
  const result = data?.data;
  const handleValuesChange = (_: TCollection, allValues: TCollection) => {
    const { billQuantity, ratePer } = allValues;

    // Calculate totalPrice if both total and ratePer are present
    if (billQuantity && ratePer) {
      form.setFieldsValue({
        amount: billQuantity * ratePer,
      });
    } else {
      form.setFieldsValue({
        amount: 0,
      });
    }
  };

  const initialValues = {
    challanNo: result?.challanNo,

    ratePer: result?.ratePer,
    style: result?.style,
    workOrderNo: result?.workOrderNo,
    amount: result?.amount,
    date: result?.date ? dayjs(result?.date) : undefined,
    orderQuantity: result?.orderQuantity,
    billQuantity: result?.billQuantity,
    billNo: result?.billNo,
    moneyReceiptNo: result?.moneyReceiptNo,
  };

  if (isLoading) return <Loading />;

  const onFinish = async (values: TCollection) => {
    const amount = isNaN(values.amount) ? 0 : values.amount;
    const billNo = "sta-" + values.billNo;
    const updateData = {
      id,
      data: { ...values, amount, billNo },
    };
    const res = await updateCollection(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Collection successfully");
    navigate(-1);
  };
  return (
    <>
      <Row>
        <SectionTitle title="Collection update" />
        <Col span={24}>
          <Form
            form={form}
            {...formItemLayout}
            onFinish={onFinish}
            layout="vertical"
            initialValues={initialValues}
            onValuesChange={handleValuesChange}
          >
            <Row gutter={10}>
              <Col span={24} md={{ span: 8 }}>
                <Form.Item
                  label="Bill No"
                  validateTrigger="onBlur"
                  name="billNo"
                  rules={[{ required: true, message: "Please input bill no" }]}
                >
                  <Input
                    addonBefore="sta-"
                    placeholder="please input Bill No"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              {CollectionFields?.map((field, index) => (
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
                </Row>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CollectionUpdate;
