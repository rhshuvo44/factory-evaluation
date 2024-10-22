import { Button, Form, InputNumber } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useGetTodayCollectionsQuery } from "../../../redux/features/collection/collectionApi";
import { useCreateReportMutation } from "../../../redux/features/report/reportApi";
import { TReport } from "../../../types";
import Loading from "../Loading";
import SectionTitle from "../SectionTitle";

const ReportForm = ({ runningCost }: { runningCost: number }) => {
  dayjs.extend(customParseFormat);
  const [form] = Form.useForm();
  const { data, isLoading, isError } = useGetTodayCollectionsQuery(undefined);
  const date = new Date().toLocaleDateString();
  const amount = data?.data?.amount;
  const [createReportMutation] = useCreateReportMutation();

  const initialValues = {
    factoryRunningCost: runningCost,
    factoryCollection: amount,
  };
  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;
  const onFinish = async (values: TReport) => {
    const reportData = {
      ...values,
      date,
      balance: values.factoryCollection - values.factoryRunningCost,
    };
    const res = await createReportMutation(reportData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create successfully");
    form.resetFields();
  };
  return (
    <>
      <SectionTitle title="Report Generate" />
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        form={form}
        initialValues={initialValues}
      >
        <Form.Item label="Running cost" name="factoryRunningCost">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>
        <Form.Item label="Collection" name="factoryCollection">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ReportForm;
