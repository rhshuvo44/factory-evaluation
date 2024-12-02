import { Button, Col, Form, InputNumber, Row } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { userRole } from "../../../constants/userRole";
import { useCreateNotificationMutation } from "../../../redux/features/notification/notificationApi";
import { useCreateOutputMutation } from "../../../redux/features/output/outputApi";
import { useGetTodayProductionQuery } from "../../../redux/features/productionReport/productionApi";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
import { TOutput } from "../../../types";
import Loading from "../Loading";

const DashboardProductionForm = (date: { date: string }) => {
  const { data, isLoading, isError, refetch } =
    useGetTodayProductionQuery(date);
  const [form] = Form.useForm();

  const [createOutputMutation] = useCreateOutputMutation();
  const { data: user } = useGetMeQuery(undefined);

  const [createNotificationMutation] = useCreateNotificationMutation();

  // Refetch collections data when date changes
  useEffect(() => {
    refetch();
  }, [date, refetch]);

  // Update form initial values when data is loaded
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        cuttingCompleted: data?.data?.totalCuttingCompleted,
        sewingOutput: data?.data?.totalSewingOutput,
        finishingOutput: data?.data?.totalFinishingOutput,
        packingCompleted: data?.data?.totalPackingCompleted,
      });
    }
  }, [data, form]);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  const onFinish = async (values: TOutput) => {
    const productData = {
      ...values,
      date: date.date,
    };
    const res = await createOutputMutation(productData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create successfully");
    form.resetFields();
    // Check if user role is admin before creating a notification
    if (user?.data?.role === userRole.Coordinator) {
      const notify = {
        message: `New Production  Report Generate created by ${user?.data?.name}`,
        date: date,
      };
      await createNotificationMutation(notify);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={24} md={{ span: 6 }}>
              <Form.Item label="Cutting Completed" name="cuttingCompleted">
                <InputNumber style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 6 }}>
              <Form.Item label="Sewing Output" name="sewingOutput">
                <InputNumber style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 6 }}>
              <Form.Item label="Finishing Output" name="finishingOutput">
                <InputNumber style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 6 }}>
              <Form.Item label="Packing Completed" name="packingCompleted">
                <InputNumber style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Production Report
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default DashboardProductionForm;
