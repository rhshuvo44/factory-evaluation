
export type PaymentType = 'Monthly' | 'Daily' | 'Once';
export type userRole = "admin" | "executive-director" | "managing-director" | "general-manager" | "coordinator"
export type TLine = "Line 1 / 3rd floor" | "Line 2 / 4th floor" | "Line 3 / 4th floor"
export type TStyle = "Hoody/Jacket" | "Leggins" | "Polo Shirt" | "T-Shirt" | "Tank Top" | "Sweat Shirt" | "Trouser" | "Shorts" | "Romper/Keeper" | "Long Sleeve T-shirt"
export type TDesignation = 'Supervisor' | 'G.M' | 'P.M' | 'Ex. Accountant' | 'Security' | 'Cutting Master' | 'Fin. Incharge' | 'Mechanic' | 'Operator' | 'Folding' | 'Check' | 'Poly' | 'Helper' | 'Maid' | 'Cleaner' | 'Cut. Helper' | 'Cutting Man' | 'Line Incharge' | 'Store Keeper'

type TParticulars = 'Commission'
    | 'Meal cost'
    | 'Machine Maintenance'
    | 'Loading & Unloading'
    | 'Rental Machine Bill'
    | 'Sample Development cost'
    | 'Night Bill (STF)'
    | 'Night Bill (WRK)'
    | 'no cost'
export type TSubUtility = {
    unitPrice: number;
    totalPrice: number;
}
export type TTravel = {
    _id?: string;
    date: string;
    particulars: string;
    description: string;
    remark: string;
    buyerId: number;
    orderNo: number;
    memoNo: number;
    payTo: string;
    paymentType: PaymentType;
    unit: number;
    unitPrice: number;
    totalPrice: number;
}

export type TMiscellaneous = {
    _id?: string;
    date: string;
    particulars: string;
    description: string;
    remark?: string;
    buyerId: number;
    orderNo: number;
    payTo: string;
    paymentType: PaymentType;
    unit: number;
    unitPrice: number;
    totalPrice: number;
}

export type TBuyer = {
    _id?: string;
    date: string;
    particulars: TParticulars;
    description: string;
    quantity: number
    buyerId: number;
    memoNo: number;
    orderNo: number;
    payTo: string;
    paymentType: PaymentType;
    unit: number;
    unitPrice: number;
    totalPrice: number;
}

export type TSalary = {
    _id?: string;
    salary: number;
    employeeId: number;
    photo: string;
    name: string;
    designation: TDesignation;
    workingDays: number
    status: boolean;
    perDaySalary: number;
    overtime: number;
    overTimeRate: number;
    grossPerDaySalary: number;
}

export type TUtility = {
    _id?: string;
    date?: string;
    internet: TSubUtility[];
    water: TSubUtility[];
    electricity: TSubUtility[];
    others?: TSubUtility[];
}

export type TUSer = {
    _id?: string;
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: userRole;
    address: string;
}

export type TFactory = {
    _id?: string;
    slNo: number;
    date: string;
    particulars: string;
    description: string;
    quantity: number;
    memoNo: number;
    orderedBy: 'M.D' | 'Chairman';
    payTo: string;
    paymentType: PaymentType;
    unit: number;
    unitPrice: number;
    totalPrice: number;
}
export type TLoan = {
    _id?: string;
    date: string;
    particulars: "Loan Return"
    description: "Emergency Loan Return" | "EMI Return"
    quantity: number;
    memoNo: string;
    orderedBy: "M.D" | "Chairman";
    payTo: "Sarkar Alliance OPC" | "chairman" | "M.D";
    paymentType: "bank" | "cash";
    unit: number;
    unitPrice: number;
    totalPrice: number;
}

export type TCollection = {
    _id?: string;
    date: string;
    time: string;
    style: TStyle;
    total: number;
    workOrderNo: number;
    lineNo: TLine;
    chalanNo: number;
    ratePer: number;
    amount: number;
}
export type TFixed = {
    _id?: string;
    date?: Date
    factoryRent: TSubUtility[];
    honorary: TSubUtility[];
    factoryRevenue: TSubUtility[];
}

export type TRunning = {
    slNo: number;
    date: Date;
    particulars: string;
    description: string;
    remark?: string;
    buyerId: string;
    orderNo: string;
    payTo: string;
    paymentType: PaymentType;
    unit: number;
    unitPrice: number;
    totalPrice: number;
}
export type TSection = {
    target: number
    wip: number
    output: number
}
export type TProductionReport = {
    _id?: string;
    orderNo: string
    buyer: string
    styleNo: string
    description: string
    quantity: number
    date: string
    orderDate: string
    shipmentDate: string
    leadTime: string
    fabricConsumption: number
    totalFabric: number
    fabricInHouse: number
    requiredFabric: number
    cuttingCompleted: number
    cuttingRequired: number
    deliveryToPrint: number
    deliveryToPrintRemaining: number
    printCompleted: number
    printReceivable: number
    sewingInput: number
    sewingInputRemaining: number
    sewingOutput: number
    sewingOutputRemaining: number
    finishingOutput: number
    finishingOutputRemaining: number
    packingCompleted: number
    packingRemaining: number
    remark?: string
}
export type TTargetReport = {
    _id?: string;
    date: Date
    lineNo: 'line 1 / 3rd floor' | 'line 2 / 4rd floor' | 'line 3 / 4rd floor'
    buyer: string
    orderNo: number
    styleNo:
    | 'hoody/jacket'
    | 'Leggins'
    | 'Polo Shirt'
    | 'T-Shirt'
    | 'Tank Top'
    | 'Sweat Shirt'
    | 'Trouser'
    | 'Shorts'
    | 'Romper/Keeper'
    | 'Long Sleeve T-shirt'
    color: string
    orderQuantity: number
    readyQuantity: number
    cuttingSection: TSection[]
    sewingSection: TSection[]
    finishing: TSection[]
    remark?: string
}

export type TTargetInputFiled = {
    date: Date
    buyer: string
    orderNo: number
    styleNo:
    | 'hoody/jacket'
    | 'Leggins'
    | 'Polo Shirt'
    | 'T-Shirt'
    | 'Tank Top'
    | 'Sweat Shirt'
    | 'Trouser'
    | 'Shorts'
    | 'Romper/Keeper'
    | 'Long Sleeve T-shirt'
    color: string
    orderQuantity: number
    cuttingSection: {
        cuttingTarget: number
        cuttingWIP: number
        cuttingOutput: number
    }
    sewingSection: {
        sewingTarget: number
        sewingWIP: number
        sewingOutput: number
    }
    finishing: {
        finishingTarget: number
        finishingWIP: number
        finishingOutput: number
    }
    remark?: string
}
export type TReport = {
    _id?: string;
    slNo: number
    date: Date
    factoryRunningCost: number
    factoryCollection: number
    balance: number
}
export type TNotification = {
    slNo: number
    date: Date
    message: string
}

export type TOrderAdd = {
    orderNo: string
    buyer: string
    styleNo: string
    description: string
    quantity: number
    orderDate: string
    shipmentDate: string
    leadTime: number
    fabricConsumption: number
    totalFabric: number
}
export type TDashboardProductionReport = {
    date: string
    cuttingCompleted: number
    printCompleted: number
    sewingOutput: number
    finishingOutput: number
    packingCompleted: number
}

export type TOutput = {
    _id?: string;
    date: string
    cuttingCompleted: number
    sewingOutput: number
    finishingOutput: number
    packingCompleted: number
}


export const DashboardProductionColumns = [
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Order No",
        dataIndex: "orderNo",
        key: "orderNo",
    },
    {
        title: "Style No",
        dataIndex: "styleNo",
        key: "styleNo",
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "Cutting Completed",
        dataIndex: "cuttingCompleted",
        key: "cuttingCompleted",
    },
    {
        title: "Print Completed",
        dataIndex: "printCompleted",
        key: "printCompleted",
    },
    {
        title: "Sewing Output",
        dataIndex: "sewingOutput",
        key: "sewingOutput",
    },
    {
        title: "Finishing Output",
        dataIndex: "finishingOutput",
        key: "finishingOutput",
    },
    {
        title: "Packing Completed",
        dataIndex: "packingCompleted",
        key: "packingCompleted",
    },
];