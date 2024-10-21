
export type PaymentType = 'Monthly' | 'Daily' | 'Once';
export type userRole = "admin" | "executive-director" | "managing-director" | "general-manager" | "coordinator"
export type TLine = "Line 1 / 3rd floor" | "Line 2 / 4th floor" | "Line 3 / 4th floor"
export type TStyle = "Hoody/Jacket" | "Leggins" | "Polo Shirt" | "T-Shirt" | "Tank Top" | "Sweat Shirt" | "Trouser" | "Shorts" | "Romper/Keeper" | "Long Sleeve T-shirt"
export type TDesignation = 'Supervisor' | 'G.M' | 'P.M' | 'Ex. Accountant' | 'Security' | 'Cutting Master' | 'Fin. Incharge' | 'Mechanic' | 'Operator' | 'Folding' | 'Check' | 'Poly' | 'Helper' | 'Maid' | 'Cleaner' | 'Cut. Helper' | 'Cutting Man';

type TParticulars = 'Commission'
    | 'Meal cost'
    | 'Machine Maintenance'
    | 'Loading & Unloading'
    | 'Rental Machine Bill'
    | 'Sample Development cost'
    | 'Night Bill (STF)'
    | 'Night Bill (WRK)';
export type TSubUtility = {
    unitPrice: number;
    totalPrice: number;
}
export type TTravel = {
    _id?: string;
    date: Date;
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
    date: Date;
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
    date: Date;
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
    date: Date;
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
    ratePer: string;
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
export type TProductionInput = {
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
