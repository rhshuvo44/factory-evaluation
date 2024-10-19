export const runningColums = [
    {
        title: "Particulars",
        dataIndex: "particulars",
        key: "particulars",
    },
    {
        title: "Description",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Remark",
        dataIndex: "remark",
        key: "remark",
    },
    {
        title: "Buyer ID",
        dataIndex: "buyerId",
        key: "buyerId",
    },
    {
        title: "Order No",
        dataIndex: "orderNo",
        key: "orderNo",
    },
    {
        title: "Pay To",
        dataIndex: "payTo",
        key: "payTo",
    },
    {
        title: "Payment Type",
        dataIndex: "paymentType",
        key: "paymentType",
    },
    {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
    },
    {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
    },
    {
        title: "Total Price",
        dataIndex: "totalPrice",
        key: "totalPrice",
    },
];

export const UserColums = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "username",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
];
export const travellingColums = [
    {
        title: "SL",
        dataIndex: "slNo",
        key: "slNo",
    },

    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Particulars",
        dataIndex: "particulars",
        key: "particulars",
        
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Remark",
        dataIndex: "remark",
        key: "remark",
    },
    {
        title: "Buyer ID",
        dataIndex: "buyerId",
        key: "buyerId",
    },
    {
        title: "Order No",
        dataIndex: "orderNo",
        key: "orderNo",
    },
    {
        title: "Memo No",
        dataIndex: "memoNo",
        key: "memoNo",
    },
    {
        title: "Pay To",
        dataIndex: "payTo",
        key: "payTo",
    },
    {
        title: "Payment Type",
        dataIndex: "paymentType",
        key: "paymentType",
    },
    {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
    },
    {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
    },
    {
        title: "Total Price",
        dataIndex: "totalPrice",
        key: "totalPrice",
    },
];
export const productionColums = [
    {
        title: "SL",
        dataIndex: "slNo",
        key: "slNo",
    },

    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Color",
        dataIndex: "color",
        key: "color",
    },
    {
        title: "Style No",
        dataIndex: "styleNo",
        key: "styleNo",
    },
    {
        title: "Buyer",
        dataIndex: "buyer",
        key: "buyer",
    },
    {
        title: "Order No ",
        dataIndex: "orderNo",
        key: "orderNo",
    },
    {
        title: "Line No ",
        dataIndex: "lineNo",
        key: "lineNo",
    },
    {
        title: "Order Quantity",
        dataIndex: "orderQuantity",
        key: "orderQuantity",
    },
    {
        title: "Ready Quantity",
        dataIndex: "readyQuantity",
        key: "readyQuantity",
    },
    {
        title: "Remark",
        dataIndex: "remark",
        key: "remark",
    },
    // Grouping Cutting Section
    {
        title: "Cutting Section",
        children: [
            {
                title: "Target",
                dataIndex: ["cuttingSection", 0, "target"],
                key: "cuttingTarget",
            },
            {
                title: "WIP",
                dataIndex: ["cuttingSection", 0, "wip"],
                key: "cuttingWIP",
            },
            {
                title: "Output",
                dataIndex: ["cuttingSection", 0, "output"],
                key: "cuttingOutput",
            },
        ],
    },
    // Grouping Selling Section
    {
        title: "Selling Section",
        children: [
            {
                title: "Target",
                dataIndex: ["sellingSection", 0, "target"],
                key: "sellingTarget",
            },
            {
                title: "WIP",
                dataIndex: ["sellingSection", 0, "wip"],
                key: "sellingWIP",
            },
            {
                title: "Output",
                dataIndex: ["sellingSection", 0, "output"],
                key: "sellingOutput",
            },
        ],
    },
    // Grouping Finishing Section
    {
        title: "Finishing Section",
        children: [
            {
                title: "Target",
                dataIndex: ["finishing", 0, "target"],
                key: "finishingTarget",
            },
            {
                title: "WIP",
                dataIndex: ["finishing", 0, "wip"],
                key: "finishingWIP",
            },
            {
                title: "Output",
                dataIndex: ["finishing", 0, "output"],
                key: "finishingOutput",
            },
        ],
    },
];

export const misColumns = [
    {
        title: "SL",
        dataIndex: "slNo",
        key: "slNo",
    },

    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Particulars",
        dataIndex: "particulars",
        key: "particulars",
    },
    {
        title: "Remark",
        dataIndex: "remark",
        key: "remark",
    },
    {
        title: "Buyer Id",
        dataIndex: "buyerId",
        key: "buyerId",
    },
    {
        title: "Order No",
        dataIndex: "orderNo",
        key: "orderNo",
    },
    {
        title: "Memo No",
        dataIndex: "memoNo",
        key: "memoNo",
    },
    {
        title: "Pay To",
        dataIndex: "payTo",
        key: "payTo",
    },
    {
        title: "Payment Type",
        dataIndex: "paymentType",
        key: "paymentType",
    },
    {
        title: "Total Price",
        dataIndex: "totalPrice",
        key: "totalPrice",
    },
    {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
    },
    {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
    },

];


export const loanColums = [
    {
        title: "SL",
        dataIndex: "slNo",
        key: "slNo",
    },

    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Particulars",
        dataIndex: "particulars",
        key: "particulars",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "Memo NO",
        dataIndex: "memoNo",
        key: "memoNo",
    },
    {
        title: "Ordered By",
        dataIndex: "orderedBy",
        key: "orderedBy",
    },
    {
        title: "Pay To",
        dataIndex: "payTo",
        key: "payTo",
    },
    {
        title: "Payment Type",
        dataIndex: "paymentType",
        key: "paymentType",
    },
    {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
    },
    {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
    },
    {
        title: "Total Price",
        dataIndex: "totalPrice",
        key: "totalPrice",
    },
];
export const factoryColums = [
    {
        title: "SL",
        dataIndex: "slNo",
        key: "slNo",
    },

    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Particulars",
        dataIndex: "particulars",
        key: "particulars",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "Memo NO",
        dataIndex: "memoNo",
        key: "memoNo",
    },
    {
        title: "Ordered By",
        dataIndex: "orderedBy",
        key: "orderedBy",
    },
    {
        title: "Pay To",
        dataIndex: "payTo",
        key: "payTo",
    },
    {
        title: "Payment Type",
        dataIndex: "paymentType",
        key: "paymentType",
    },
    {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
    },
    {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
    },
    {
        title: "Total Price",
        dataIndex: "totalPrice",
        key: "totalPrice",
    },


];


export const collectionColums = [
    {
        title: "SL",
        dataIndex: "slNo",
        key: "slNo",
    },

    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Time",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "Style",
        dataIndex: "style",
        key: "style",
    },
    {
        title: "Total",
        dataIndex: "total",
        key: "total",
    },
    {
        title: "Work Order No ",
        dataIndex: "workOrderNo",
        key: "workOrderNo",
    },
    {
        title: "Line No ",
        dataIndex: "lineNo",
        key: "lineNo",
    },
    {
        title: "Challan NO",
        dataIndex: "challanNo",
        key: "challanNo",
    },
    {
        title: "Rate Per",
        dataIndex: "ratePer",
        key: "ratePer",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },
];

export   const buyerColums = [
    {
      title: "SL",
      dataIndex: "slNo",
      key: "slNo",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Buyer ID",
      dataIndex: "buyerId",
      key: "buyerId",
    },
    {
      title: "Order No",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "Memo No",
      dataIndex: "memoNo",
      key: "memoNo",
    },
    {
      title: "Pay To",
      dataIndex: "payTo",
      key: "payTo",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];