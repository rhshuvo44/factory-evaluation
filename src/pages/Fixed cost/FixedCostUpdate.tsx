import { Button, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useSingleFixedCostQuery,
  useUpdateFixedCostMutation,
} from "../../redux/features/fixedCost/fixedCostApi";
import { TFixed, TSubUtility } from "../../types";
import { useEffect } from "react";
import { getDaysInMonth } from "../../utilis/getDaysInMonth ";

const FixedCostUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleFixedCostQuery(id);
  const [updateFixedCost] = useUpdateFixedCostMutation();
  const initialValues = {
    factoryRent: data?.data.factoryRent[0].totalPrice,
    factoryRevenue: data?.data.factoryRevenue[0].totalPrice,
    honorary: data?.data.honorary[0].totalPrice,
  };

  useEffect(() => {
    if (!data) {
      form.resetFields();
    }
  }, [data, form]);

  if (isLoading) return <Loading />;
  const onFinish = async (values: TFixed) => {
    const { factoryRent, factoryRevenue, honorary } = values;
    const factoryRentBill: TSubUtility = {
      unitPrice:
        typeof factoryRent === "number"
          ? parseFloat((factoryRent / getDaysInMonth(new Date())).toFixed(2))
          : 0,
      totalPrice: typeof factoryRent === "number" ? factoryRent : 0,
    };
    const factoryRevenueBill: TSubUtility = {
      unitPrice:
        typeof factoryRevenue === "number"
          ? parseFloat((factoryRevenue / getDaysInMonth(new Date())).toFixed(2))
          : 0,
      totalPrice: typeof factoryRevenue === "number" ? factoryRevenue : 0,
    };
    const honoraryBill: TSubUtility = {
      unitPrice:
        typeof honorary === "number"
          ? parseFloat((honorary / getDaysInMonth(new Date())).toFixed(2))
          : 0,
      totalPrice: typeof honorary === "number" ? honorary : 0,
    };

    const fixedCost = {
      factoryRent: [factoryRentBill],
      factoryRevenue: [factoryRevenueBill],
      honorary: [honoraryBill],
    };
    const updateData = {
      id,
      data: { ...fixedCost },
    };
    const res = await updateFixedCost(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Fixed Cost successfully");
    navigate(-1);
  };

  return (
    <>
      <SectionTitle title="Fixed Cost update" />
      <Form
        {...formItemLayout}
        initialValues={initialValues}
        form={form}
        onFinish={onFinish}
      >
        <CustomInputNumber
          label="Factory Rent"
          name="factoryRent"
          message="Please input Factory Rent Cost"
        />
        <CustomInputNumber
          label="Honorary"
          name="honorary"
          message="Please input Honorary Cost"
        />
        <CustomInputNumber
          label="Factory Revenue"
          name="factoryRevenue"
          message="Please input Factory Revenue Cost"
        />

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FixedCostUpdate;
