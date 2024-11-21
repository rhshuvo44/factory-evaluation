import { Button, Form } from "antd";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateFixedCostMutation } from "../../../redux/features/fixedCost/fixedCostApi";
import { TFixed, TSubUtility } from "../../../types/tableType";
import { getDaysInMonth } from "../../../utils/getDaysInMonth ";
import CustomInputNumber from "../../form/CustomInputNumber";

const FixedCostAdd = () => {
  const [form] = Form.useForm();
  const [createFixedCost] = useCreateFixedCostMutation();
  const date = new Date().toLocaleDateString();
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
    const res = await createFixedCost({ ...fixedCost, date }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Utility successfully");
    form.resetFields();
  };

  return (
    <Form {...formItemLayout} layout="vertical" form={form} onFinish={onFinish}>
      <CustomInputNumber
        label="Factory Rent"
        name="factoryRent"
        message="Please input Factory Rent Cost"
        placeholder="please input Factory rent cost"
      />
      <CustomInputNumber
        label="Honorary"
        name="honorary"
        message="Please input Honorary Cost"
        placeholder="please input Honorary Cost"
      />
      <CustomInputNumber
        label="Factory Revenue"
        name="factoryRevenue"
        message="Please input Factory Revenue Cost"
        placeholder="please input Factory Revenue Cost"
      />

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FixedCostAdd;
