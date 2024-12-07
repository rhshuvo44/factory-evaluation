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
        { value: "No Line", label: "No Line" },
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
    name: "orderDate",
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
export const productionReportDisableFields = [
  {
    label: "Buyer Name",
    name: "buyer",
    type: "Input",
    props: {
      placeholder: "please input Buyer Name",
      disabled: true
    },
  },
  {
    label: "style No",
    name: "styleNo",
    type: "InputNumber",
    props: {
      placeholder: "please input styleNo",
      disabled: true
    },
  },
  {
    label: "Description",
    name: "description",
    type: "TextArea",
    props: {
      placeholder: "please input Description",
      disabled: true
    },
  },
  {
    label: "Order Quantity",
    name: "quantity",
    type: "InputNumber",
    props: {
      placeholder: "please input Order Quantity",
      disabled: true
    },
  },
  {
    label: "Order Date",
    name: "orderDate",
    type: "DatePicker",
    props: {
      placeholder: "please input Order Date",
      disabled: true
    },
  },
  {
    label: "Shipment Date",
    name: "shipmentDate",
    type: "DatePicker",
    props: {
      placeholder: "please input Shipment Date",
      disabled: true
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
      disabled: true
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
export const productionReportFields = [
  {
    label: "Required Fabric",
    name: "requiredFabric",
    type: "InputNumber",
    props: {
      placeholder: "please input requiredFabric",
      disabled: true
    },
  },
  {
    label: "fabric In House ",
    name: "fabricInHouse",
    type: "InputNumber",
    props: {
      placeholder: "please input fabricInHouse ",
      disabled: true
    },
  },
  {
    label: "fabric In House ",
    name: "todayFabricInHouse",
    type: "InputNumber",
    props: {
      placeholder: "please input fabricInHouse ",

    },
  },

  {
    label: "Cutting Required",
    name: "cuttingRequired",
    type: "InputNumber",
    props: {
      placeholder: "please input Cutting Required",
      disabled: true
    },
  },
  {
    label: "Cutting Completed (Per price)",
    name: "cuttingCompleted",
    type: "InputNumber",
    props: {
      placeholder: "Cutting Completed (Per price)",
      disabled: true
    },
  },
  {
    label: "Cutting Completed (Per price)",
    name: "todayCuttingCompleted",
    type: "InputNumber",
    props: {
      placeholder: "Cutting Completed (Per price)",

    },
  },
  {
    label: "Delivery To Print Remaining (Per Price)",
    name: "deliveryToPrintRemaining",
    type: "InputNumber",
    props: {
      placeholder: "Delivery To Print Remaining (Per Price)",
      disabled: true
    },
  },
  {
    label: "Delivery To Print (Per Price)",
    name: "deliveryToPrint",
    type: "InputNumber",
    props: {
      placeholder: "Delivery To Print (Per Price)",
      disabled: true
    },
  },
  {
    label: "Delivery To Print (Per Price)",
    name: "todayDeliveryToPrint",
    type: "InputNumber",
    props: {
      placeholder: "Delivery To Print (Per Price)",

    },
  },
  {
    label: "Print Receivable",
    name: "printReceivable",
    type: "InputNumber",
    props: {
      placeholder: "print Receivable",
      disabled: true
    },
  },
  {
    label: "Print Completed",
    name: "printCompleted",
    props: {
      placeholder: "please input Print Completed",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Print Completed",
    name: "todayPrintCompleted",
    props: {
      placeholder: "please input Print Completed",

    },
    type: "InputNumber",
  },
  {
    label: "Sewing Input Remaining",
    name: "sewingInputRemaining",
    props: {
      placeholder: "sewing Input Remaining",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Sewing Input",
    name: "sewingInput",
    props: {
      placeholder: "please input sewing Input",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Sewing Input",
    name: "todaySewingInput",
    props: {
      placeholder: "please input sewing Input",
    },
    type: "InputNumber",
  },
  {
    label: "Sewing Output Remaining",
    name: "sewingOutputRemaining",
    props: {
      placeholder: "sewing Output Remaining",
      disabled: true
    },
    type: "InputNumber",
  },

  {
    label: "Sewing Output",
    name: "sewingOutput",
    props: {
      placeholder: "sewing Output",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Sewing Output",
    name: "todaySewingOutput",
    props: {
      placeholder: "sewing Output",
    },
    type: "InputNumber",
  },
  {
    label: "Finishing Output Remaining",
    name: "finishingOutputRemaining",
    props: {
      placeholder: "finishing Output Remaining",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Finishing Output",
    name: "finishingOutput",
    props: {
      placeholder: "Finishing Output",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Finishing Output",
    name: "todayFinishingOutput",
    props: {
      placeholder: "Finishing Output",
    },
    type: "InputNumber",
  },
  {
    label: "Packing Remaining",
    name: "packingRemaining",
    props: {
      placeholder: "Packing Remaining",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Packing Completed",
    name: "packingCompleted",
    props: {
      placeholder: "Packing Completed",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Packing Completed",
    name: "todayPackingCompleted",
    props: {
      placeholder: "Packing Completed",
    },
    type: "InputNumber",
  },
  {
    label: "Remark",
    name: "remark",
    props: {
      placeholder: "Remark",
    },
    type: "Input",
  },
  {
    label: "Date",
    name: "date",
    type: "DatePicker",
    props: {
      placeholder: "please input  Date",
      disabledDate: getDisabledDates(30),
    },
  },
];
export const productionReportUpdateFields = [
  {
    label: "Required Fabric",
    name: "requiredFabric",
    type: "InputNumber",
    props: {
      placeholder: "please input requiredFabric",
      disabled: true
    },
  },
  {
    label: "fabric In House ",
    name: "fabricInHouse",
    type: "InputNumber",
    props: {
      placeholder: "please input fabricInHouse ",

    },
  },


  {
    label: "Cutting Required",
    name: "cuttingRequired",
    type: "InputNumber",
    props: {
      placeholder: "please input Cutting Required",
      disabled: true
    },
  },
  {
    label: "Cutting Completed (Per price)",
    name: "cuttingCompleted",
    type: "InputNumber",
    props: {
      placeholder: "Cutting Completed (Per price)",

    },
  },

  {
    label: "Delivery To Print Remaining (Per Price)",
    name: "deliveryToPrintRemaining",
    type: "InputNumber",
    props: {
      placeholder: "Delivery To Print Remaining (Per Price)",
      disabled: true
    },
  },
  {
    label: "Delivery To Print (Per Price)",
    name: "deliveryToPrint",
    type: "InputNumber",
    props: {
      placeholder: "Delivery To Print (Per Price)",

    },
  },

  {
    label: "Print Receivable",
    name: "printReceivable",
    type: "InputNumber",
    props: {
      placeholder: "print Receivable",
      disabled: true
    },
  },
  {
    label: "Print Completed",
    name: "printCompleted",
    props: {
      placeholder: "please input Print Completed",

    },
    type: "InputNumber",
  },

  {
    label: "Sewing Input Remaining",
    name: "sewingInputRemaining",
    props: {
      placeholder: "sewing Input Remaining",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Sewing Input",
    name: "sewingInput",
    props: {
      placeholder: "please input sewing Input",

    },
    type: "InputNumber",
  },

  {
    label: "Sewing Output Remaining",
    name: "sewingOutputRemaining",
    props: {
      placeholder: "sewing Output Remaining",
      disabled: true
    },
    type: "InputNumber",
  },

  {
    label: "Sewing Output",
    name: "sewingOutput",
    props: {
      placeholder: "sewing Output",

    },
    type: "InputNumber",
  },

  {
    label: "Finishing Output Remaining",
    name: "finishingOutputRemaining",
    props: {
      placeholder: "finishing Output Remaining",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Finishing Output",
    name: "finishingOutput",
    props: {
      placeholder: "Finishing Output",

    },
    type: "InputNumber",
  },

  {
    label: "Packing Remaining",
    name: "packingRemaining",
    props: {
      placeholder: "Packing Remaining",
      disabled: true
    },
    type: "InputNumber",
  },
  {
    label: "Packing Completed",
    name: "packingCompleted",
    props: {
      placeholder: "Packing Completed",

    },
    type: "InputNumber",
  },

  {
    label: "Remark",
    name: "remark",
    props: {
      placeholder: "Remark",
    },
    type: "Input",
  },
  {
    label: "Date",
    name: "date",
    type: "DatePicker",
    props: {
      placeholder: "please input  Date",
      disabledDate: getDisabledDates(30),
    },
  },
];