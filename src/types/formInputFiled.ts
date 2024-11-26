import { buyerParticularsOptions, paymentOptions, styleOption } from "../constants/Options";
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
export const travellingFields = [
  {
    label: "Particulars",
    name: "particulars",
    type: "Input",
    props: {
      placeholder: "please input Particulars",
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
    label: "Remark",
    name: "remark",
    type: "Input",
    props: {
      placeholder: "please input Remark",
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
export const miscellaneousFields = [
  {
    label: "Particulars",
    name: "particulars",
    type: "Input",
    props: {
      placeholder: "please input Particulars",
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
    label: "Remark",
    name: "remark",
    type: "Input",
    props: {
      placeholder: "please input Remark",
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
export const factoryDevelopmentFields = [
  {
    label: "Particulars",
    name: "particulars",
    type: "Input",
    props: {
      placeholder: "please input Particulars",
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
    label: "Ordered By",
    name: "orderedBy",
    type: "Select",
    props: {
      placeholder: "please input Ordered By",
      options: [
        { value: "M.D", label: "M.D" },
        { value: "Chairman", label: "Chairman" },
      ],
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
    label: "Memo No",
    name: "memoNo",
    type: "InputNumber",
    props: {
      placeholder: "please input Memo No",
    },
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
export const loanFields = [
  {
    label: "Particulars",
    name: "particulars",
    type: "Input",
    props: {
      placeholder: "please input Particulars",
      disabled: true,

    },
  },

  {
    label: "Description",
    name: "description",
    type: "Select",
    props: {
      placeholder: "please input Description",
      options: [
        { value: "Emergency Loan Return", label: "Emergency Loan Return" },
        { value: "EMI Return", label: "EMI Return" },
      ]
    },
  },
  {
    label: "Ordered By",
    name: "orderedBy",
    type: "Select",
    props: {
      placeholder: "please input Ordered By",
      options: [
        { value: "M.D", label: "M.D" },
        { value: "Chairman", label: "Chairman" },
      ],
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
    label: "Memo No",
    name: "memoNo",
    type: "InputNumber",
    props: {
      placeholder: "please input Memo No",
    },
  },

  {
    label: "Pay To",
    name: "payTo",
    type: "Select",
    props: {
      placeholder: "please input Pay To",
      options: [
        { value: "Sarkar Alliance OPC", label: "Sarkar Alliance Opc" },
        { value: "M.D", label: "M.D" },
        { value: "Chairman", label: "Chairman" },
      ]
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
      options: [
        { value: "Bank", label: "Bank" },
        { value: "Cash", label: "Cash" },
      ],
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
export const CollectionFields = [

  {
    label: "style",
    name: "style",
    type: "Select",
    props: {
      placeholder: "please input style",
      options: styleOption
    },
  },
  {
    label: "line No",
    name: "lineNo",
    type: "Select",
    props: {
      placeholder: "please input line No",
      options: [
        { value: "line 1 / 3rd floor", label: "line 1 / 3rd floor" },
        { value: "line 2 / 4th floor", label: "line 2 / 4th floor" },
        { value: "line 3 / 4th floor", label: "line 3 / 4th floor" },
      ]
    },
  },
  {
    label: "Total",
    name: "total",
    type: "InputNumber",
    props: {
      placeholder: "please input Total",
    },
  },

  {
    label: "work Order No",
    name: "workOrderNo",
    type: "InputNumber",
    props: {
      placeholder: "please input work Order No",
    },
  },
  {
    label: "challan No",
    name: "challanNo",
    type: "InputNumber",
    props: {
      placeholder: "please input challan No",
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
    label: "Rate Per",
    name: "ratePer",
    props: {
      placeholder: "please input Rate Per",
      // onChange: onChangeUnit,
    },
    type: "InputNumber",
  },

  {
    label: "Amount",
    name: "amount",
    props: {
      placeholder: "total * ratePer (Amount)",
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