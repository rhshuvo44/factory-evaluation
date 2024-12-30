import { Button, Col, Form, Input, Row } from "antd";
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

  const time = new Date().toLocaleTimeString();

  const onFinish = async (values: TCollection) => {
    const billNo = "sta-" + values.billNo;

    if (values.date) {
      values.date = dayjs(values.date).format("YYYY-MM-DD");
    }
    const res = await createCollectionMutation({
      ...values,
      time,
      billNo,
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
  );
};

export default CollectionAdd;
