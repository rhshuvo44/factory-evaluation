import { buyerParticularsOptions, paymentOptions } from "../constants/Options";
import { getDisabledDates } from "../utils/dateUtils";


export const buyerDevelopmentFields = [
  {
    label: "Particulars",
    name: "particulars",
    type: "Select",
    props: {
      placeholder: "please input Particulars",
      options: buyerParticularsOptions,
    },
  },

  {
    label: "Description",
    name: "description",
    type: "TextArea",
    props: {
      placeholder: "please input Description",
    },
  },
  {
    label: "Quantity",
    name: "quantity",
    type: "InputNumber",
    props: {
      placeholder: "please input Quantity",
    },
  },
  {
    label: "Buyer ID",
    name: "buyerId",
    type: "InputNumber",
    props: {
      placeholder: "please input Buyer ID",
    },
  },
  {
    label: "Memo No",
    name: "memoNo",
    type: "InputNumber",
    props: {
      placeholder: "please input Memo No",
    },
  },
  {
    label: "Order No",
    name: "orderNo",
    props: {
      placeholder: "please input Order No",
    },
    type: "InputNumber",
  },
  {
    label: "Pay To",
    name: "payTo",
    type: "Input",
    props: {
      placeholder: "please input Pay To",
    },
  },
  {
    label: "Date",
    name: "date",
    type: "DatePicker",
    props: {
      placeholder: "please input Date",
      disabledDate: getDisabledDates(30),
    },
  },
  {
    label: "Payment Type",
    name: "paymentType",
    type: "Select",
    props: {
      placeholder: "please input Payment Type",
      options: paymentOptions,
    },
  },
  {
    label: "Unit",
    name: "unit",
    props: {
      placeholder: "please input Unit",
      // onChange: onChangeUnit,
    },
    type: "InputNumber",
  },
  {
    label: "Unit Price",
    name: "unitPrice",
    props: {
      placeholder: "please input unit Price",
      // onChange: onChangeUnitPrice,
    },
    type: "InputNumber",
  },
  {
    label: "Total Price",
    name: "totalPrice",
    props: {
      placeholder: "Unit * Unit price (total price)",
      disabled: true,
    },
    type: "InputNumber",
  },
];
export const orderFields = [

  {
    label: "Description",
    name: "description",
    type: "TextArea",
    props: {
      placeholder: "please input Description",
    },
  },
  {
    label: "Order Quantity",
    name: "quantity",
    type: "InputNumber",
    props: {
      placeholder: "please input Order Quantity",
    },
  },
  {
    label: "Buyer Name",
    name: "buyer",
    type: "Input",
    props: {
      placeholder: "please input Buyer Name",
    },
  },
 
 
  {
    label: "Order Date",
    name: "date",
    type: "DatePicker",
    props: {
      placeholder: "please input Order Date",
      disabledDate: getDisabledDates(30),
    },
  },
  {
    label: "Shipment Date",
    name: "shipmentDate",
    type: "DatePicker",
    props: {
      placeholder: "please input Shipment Date",
    },
  },
  {
    label: "Lead Time",
    name: "leadTime",
    type: "Input",
    props: {
      placeholder: "please input Lead Time",
      disabled: true
    },
  },
  {
    label: "Fabric Consumption (KG)",
    name: "fabricConsumption",
    props: {
      placeholder: "please input Fabric Consumption (KG)",
    },
    type: "InputNumber",
  },
  {
    label: "Total Fabric Required",
    name: "totalFabric",
    props: {
      placeholder: "(fabricConsumption / 12) * quantity",
      disabled: true,
    },
    type: "InputNumber",
  },
];