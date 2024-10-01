import { Button, Form, InputNumber } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomInputNumber from "../../components/form/CustomInputNumber";
import Loading from "../../components/ui/Loading";
import SectionTitle from "../../components/ui/SectionTitle";
import { formItemLayout } from "../../constants/formItemLayout";
import {
  useSingleUtilityQuery,
  useUpdateUtilityMutation,
} from "../../redux/features/utility/utilityApi";
import { TSubUtility, TUtility } from "../../types";

const UtilityUpdate = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  // const [date, setDate] = useState<string | string[]>("");

  const id: string = location.pathname.split("/")[3];
  const { data, isLoading } = useSingleUtilityQuery(id);
  const [updateUtility] = useUpdateUtilityMutation();
  const initialValues = {
    electricity: data?.data.electricity[0].totalPrice,
    internet: data?.data.internet[0].totalPrice,
    water: data?.data.water[0].totalPrice,
    others: data?.data.others[0].totalPrice,
  };
  // date

  if (isLoading) return <Loading />;
  const onFinish = async (values: TUtility) => {
    const { electricity, internet, water, others } = values;
    const internetBill: TSubUtility = {
      unitPrice: typeof internet === "number" ? internet / 30 : 0,
      totalPrice: typeof internet === "number" ? internet : 0,
    };
    const waterBill: TSubUtility = {
      unitPrice: typeof water === "number" ? water / 30 : 0,
      totalPrice: typeof water === "number" ? water : 0,
    };
    const electricityBill: TSubUtility = {
      unitPrice: typeof electricity === "number" ? electricity / 30 : 0,
      totalPrice: typeof electricity === "number" ? electricity : 0,
    };
    const othersBill: TSubUtility = {
      unitPrice: typeof others === "number" ? others / 30 : 0,
      totalPrice: typeof others === "number" ? others : 0,
    };
    const utility = {
      internet: [internetBill],
      water: [waterBill],
      electricity: [electricityBill],
      others: [othersBill],
    };
    const updateData = {
      id,
      data: { ...utility },
    };
    const res = await updateUtility(updateData).unwrap();
    if (!res.success) return toast.error(res.message);
    toast.success("Update Loan Return successfully");
    navigate(-1);
  };
  return (
    <>
      <SectionTitle title="Utility update" />
      <Form
        form={form}
        initialValues={initialValues}
        {...formItemLayout}
        onFinish={onFinish}
      >
        <CustomInputNumber
          label="Internet"
          name="internet"
          message="Please input Internet Bill"
        />
        <CustomInputNumber
          label="Water"
          name="water"
          message="Please input Water bill"
        />
        <CustomInputNumber
          label="Electricity"
          name="electricity"
          message="Please input Electricity bill"
        />

        <Form.Item
          label="Others"
          name="others"
          rules={[{ required: false, message: "Please input Others Bill" }]}
        >
          <InputNumber style={{ width: "100%" }} />
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

export default UtilityUpdate;
