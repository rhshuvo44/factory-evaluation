import { Button, Form, InputNumber, InputNumberProps, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import Loading from "../../components/ui/Loading";
import { formItemLayout } from "../../constants/formItemLayout";
import { styleOption } from "../../constants/Options";
import {
  useSingleCollectionQuery,
  useUpdateCollectionMutation,
} from "../../redux/features/collection/collectionApi";
import { TCollection } from "../../types";

const CollectionUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleCollectionQuery(id);
  const [updateCollection] = useUpdateCollectionMutation();
  const result = data?.data;
  const [total, setTotal] = useState<number>(result?.total);
  const [ratePer, setRatePer] = useState<number>(result?.ratePer);
  const onChangeTotal: InputNumberProps["onChange"] = (values) => {
    setTotal(values as number);
  };
  const onChangeRatePer: InputNumberProps["onChange"] = (values) => {
    setRatePer(values as number);
  };

  useEffect(() => {
    form.setFieldsValue({
      amount: total * ratePer || result?.amount,
    });
  }, [total, ratePer, form, result?.amount]);

  const initialValues = {
    amount: result?.amount,
    challanNo: result?.challanNo,
    lineNo: result?.lineNo,
    ratePer: result?.ratePer,
    style: result?.style,
    total: result?.total,
    workOrderNo: result?.workOrderNo,
  };
  // date

  if (isLoading) return <Loading />;

  const onFinish = async (values: TCollection) => {
    const amount = isNaN(values.amount) ? 0 : values.amount;
    const updateData = {
      id,
      data: { ...values, amount },
    };
    const res = await updateCollection(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Collection successfully");
    navigate(-1);
  };
  return (
    <Form
      {...formItemLayout}
      onFinish={onFinish}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item
        label="Style"
        name="style"
        rules={[{ required: true, message: "Please select Style! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select"
          options={styleOption}
        />
      </Form.Item>
      <Form.Item
        label="Total"
        name="total"
        rules={[{ required: true, message: "Please input! Total" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeTotal}
        />
      </Form.Item>
      <CustomInputNumber
        label="Work Order No"
        name="workOrderNo"
        message="Please input! Work Order No"
      />
      <CustomInputNumber
        label="Challan No"
        name="challanNo"
        message="Please input! Challan No"
      />
      <Form.Item
        label="Line No"
        name="lineNo"
        rules={[{ required: true, message: "Please select Line No! " }]}
      >
        <Select
          style={{ width: "100%" }}
          defaultValue="Please select"
          options={[
            { value: "line 1 / 3rd floor", label: "line 1 / 3rd floor" },
            { value: "line 2 / 4th floor", label: "line 2 / 4th floor" },
            { value: "line 3 / 4th floor", label: "line 3 / 4th floor" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Rate Per"
        name="ratePer"
        rules={[{ required: true, message: "Please input! Rate Per" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          onChange={onChangeRatePer}
        />
      </Form.Item>
      <Form.Item label="Amount" name="amount">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CollectionUpdate;
