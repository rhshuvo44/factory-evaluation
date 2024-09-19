import { Button, Form } from "antd";
import { formItemLayout } from "../../../constants/formItemLayout";
import { TFixed, TSubUtility } from "../../../types/tableType";
import CustomInputNumber from "../../form/CustomInputNumber";

const FixedCostAdd = () => {
  const onFinish = (values: TFixed) => {
    // console.log("Received values of form: ", values);
    const { factoryRent, factoryRevenue, honorary } = values;
    const factoryRentBill: TSubUtility = {
      unitPrice: typeof factoryRent === "number" ? factoryRent / 30 : 0,
      totalPrice: typeof factoryRent === "number" ? factoryRent : 0,
    };
    const factoryRevenueBill: TSubUtility = {
      unitPrice: typeof factoryRevenue === "number" ? factoryRevenue / 30 : 0,
      totalPrice: typeof factoryRevenue === "number" ? factoryRevenue : 0,
    };
    const honoraryBill: TSubUtility = {
      unitPrice: typeof honorary === "number" ? honorary / 30 : 0,
      totalPrice: typeof honorary === "number" ? honorary : 0,
    };

    const fixedCost = {
      factoryRent: factoryRentBill,
      factoryRevenue: factoryRevenueBill,
      honorary: honoraryBill,
    };
    console.log(fixedCost);
    //! Call your backend API to handle the login request
    // and handle the response appropriately
    // You can use the following code as a reference:
  };

  return (
    <Form {...formItemLayout} onFinish={onFinish}>
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
  );
};

export default FixedCostAdd;
