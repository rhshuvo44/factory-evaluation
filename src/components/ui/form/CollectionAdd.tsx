import { Button, Col, Form, Row } from "antd";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateCollectionMutation } from "../../../redux/features/collection/collectionApi";
import { CollectionFields } from "../../../types";
import { TCollection } from "../../../types/tableType";
import RenderFormItem from "../../form/RenderFormItem";

const CollectionAdd = () => {
  dayjs.extend(customParseFormat);
  const [form] = Form.useForm();

  const [createCollectionMutation] = useCreateCollectionMutation();

  const handleValuesChange = (_: TCollection, allValues: TCollection) => {
    const { total, ratePer } = allValues;

    // Calculate totalPrice if both total and ratePer are present
    if (total && ratePer) {
      form.setFieldsValue({
        amount: total * ratePer,
      });
    } else {
      form.setFieldsValue({
        amount: 0,
      });
    }
  };

  const time = new Date().toLocaleTimeString();

  const onFinish = async (values: TCollection) => {
    if (values.date) {
      values.date = dayjs(values.date).format("YYYY-MM-DD");
    }
    const res = await createCollectionMutation({
      ...values,
      time,
    }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create successfully");
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
            {CollectionFields?.map((field, index) => (
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

export default CollectionAdd;
