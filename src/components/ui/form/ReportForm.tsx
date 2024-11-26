import { Button, Col, Form, InputNumber, Row } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect } from "react";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { userRole } from "../../../constants/userRole";
import { useGetTodayCollectionsQuery } from "../../../redux/features/collection/collectionApi";
import { useCreateNotificationMutation } from "../../../redux/features/notification/notificationApi";
import { useCreateReportMutation } from "../../../redux/features/report/reportApi";
import { useGetMeQuery } from "../../../redux/features/user/userApi";
import { TReport } from "../../../types";
import Loading from "../Loading";
import SectionTitle from "../SectionTitle";

const ReportForm = ({
  runningCost,
  date,
}: {
  runningCost: number;
  date: string;
}) => {
  dayjs.extend(customParseFormat);
  const [form] = Form.useForm();
  const { data, isLoading, isError, refetch } =
    useGetTodayCollectionsQuery(date);
  // const date = new Date().toLocaleDateString();
  const amount = data?.data?.amount;
  const [createReportMutation] = useCreateReportMutation();
  const { data: user } = useGetMeQuery(undefined);

  const [createNotificationMutation] = useCreateNotificationMutation();
  const initialValues = {
    factoryRunningCost: runningCost,
    factoryCollection: amount,
  };
  // Refetch collections data when date changes
  useEffect(() => {
    refetch();
  }, [date, refetch]);

  // Update form initial values when data is loaded
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        factoryRunningCost: runningCost,
        factoryCollection: data?.data?.amount,
      });
    }
  }, [data, runningCost, form]);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;
  const onFinish = async (values: TReport) => {
    const totalBalance = values.factoryCollection - values.factoryRunningCost;
    const reportData = {
      factoryRunningCost: parseFloat(values.factoryRunningCost.toString()),
      factoryCollection: parseFloat(values.factoryCollection.toString()),
      date,
      balance: parseFloat(totalBalance.toString()),
    };
    const res = await createReportMutation(reportData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create successfully");
    form.resetFields();
    // Check if user role is admin before creating a notification
    if (user?.data?.role === userRole.ExecutiveDirector) {
      const notify = {
        message: `New Report Generate created by ${user?.data?.name}`,
        date: date,
      };
      await createNotificationMutation(notify);
    }
  };
  return (
    <Row justify="center">
      <SectionTitle title="Report Generate" />
      <Col span={24}>
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
          layout="vertical"
          initialValues={initialValues}
        >
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item label="Running cost" name="factoryRunningCost">
                <InputNumber style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <Form.Item label="Collection" name="factoryCollection">
                <InputNumber style={{ width: "100%" }} disabled />
              </Form.Item>
            </Col>
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

export default ReportForm;
