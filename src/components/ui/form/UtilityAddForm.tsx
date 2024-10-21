import { Button, Form, InputNumber } from "antd";
import { toast } from "sonner";
import { formItemLayout } from "../../../constants/formItemLayout";
import { useCreateUtilityMutation } from "../../../redux/features/utility/utilityApi";
import { TSubUtility, TUtility } from "../../../types/tableType";
import CustomInputNumber from "../../form/CustomInputNumber";
import { getDaysInMonth } from "../../../utilis/getDaysInMonth ";

const UtilityAddForm = () => {
  const [form] = Form.useForm();
  const [createUtility] = useCreateUtilityMutation();
  const date = new Date().toLocaleDateString();

  const onFinish = async (values: TUtility) => {
    const { electricity, internet, water, others } = values;
    const internetBill: TSubUtility = {
      unitPrice:
        typeof internet === "number"
          ? parseFloat((internet / getDaysInMonth(new Date())).toFixed(2))
          : 0,
      totalPrice: typeof internet === "number" ? internet : 0,
    };
    const waterBill: TSubUtility = {
      unitPrice:
        typeof water === "number"
          ? parseFloat((water / getDaysInMonth(new Date())).toFixed(2))
          : 0,
      totalPrice: typeof water === "number" ? water : 0,
    };
    const electricityBill: TSubUtility = {
      unitPrice:
        typeof electricity === "number"
          ? parseFloat((electricity / getDaysInMonth(new Date())).toFixed(2))
          : 0,
      totalPrice: typeof electricity === "number" ? electricity : 0,
    };
    const othersBill: TSubUtility = {
      unitPrice:
        typeof others === "number"
          ? parseFloat((others / getDaysInMonth(new Date())).toFixed(2))
          : 0,
      totalPrice: typeof others === "number" ? others : 0,
    };
    const utility = {
      internet: [internetBill],
      water: [waterBill],
      electricity: [electricityBill],
      others: [othersBill],
    };
    const res = await createUtility({ ...utility, date }).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Create Utility successfully");
    form.resetFields();
    
  };
  return (
    <Form {...formItemLayout} onFinish={onFinish}>
      <CustomInputNumber
        label="Internet"
        name="internet"
        message="Please input Internet Bill"
        placeholder="please input Internet Bill"
      />
      <CustomInputNumber
        label="Water"
        name="water"
        message="Please input Water bill"
        placeholder="please input Water bills"
      />
      <CustomInputNumber
        label="Electricity"
        name="electricity"
        message="Please input Electricity bill"
        placeholder="please input Electricity bills"
      />

      <Form.Item
        label="Others"
        name="others"
        rules={[{ required: false, message: "Please input Others Bill" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="please input  Others Bill (optional)"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UtilityAddForm;
