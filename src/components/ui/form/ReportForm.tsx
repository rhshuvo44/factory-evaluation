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
import { useEffect } from "react";

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
