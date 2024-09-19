
export type PaymentType = 'Monthly' | 'Daily' | 'Once';
export type userRole = "admin" | "executive-director" | "managing-director" | "general-director" | "coordinator"
export type TLine = "Line 1 / 3rd floor" | "Line 2 / 4th floor" | "Line 3 / 4th floor"
export type TStyle = "Hoody/Jacket" | "Leggins" | "Polo Shirt" | "T-Shirt" | "Tank Top" | "Sweat Shirt" | "Trouser" | "Shorts" | "Romper/Keeper" | "Long Sleeve T-shirt"
export type TTravel = {
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
export type TMiscellaneous = {
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

export type TBuyer = {
    slNo: number;
    date: Date;
    particulars: string;
    description: string;
    quantity: number
    buyerId: string;
    orderNo: string;
    payTo: string;
    paymentType: PaymentType;
    unit: number;
    unitPrice: number;
    totalPrice: number;
}
export type TSalary = {
    employeeId: number;
    employeeImg: string;
    name: string;
    designation: string;
    workingDays: number
    status: boolean;
    perDaySalary: number;
    overtime: number;
    overTimeRate: number;
    grossPerDaySalary: number;
}

export type TUtility = {
    internet: number;
    water: number;
    electricity: number;
    others?: number;
}

export type TUSer = {
    name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: userRole;
    address: string;
}


export type TFactory = {
    slNo: number;
    date: Date;
    particulars: string;
    description: string;
    quantity: number;
    memoNo: string;
    orderedBy: string;
    payTo: string;
    paymentType: PaymentType;
    unit: number;
    unitPrice: number;
    totalPrice: number;
}
export type TLoan = {
    slNo: number;
    date: Date;
    particulars: string;
    description: string;
    quantity: number;
    memoNo: string;
    orderedBy: string;
    payTo: string;
    paymentType: PaymentType;
    unit: number;
    unitPrice: number;
    totalPrice: number;
}

export type TCollection = {
    slNo: number;
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
    factoryRent: number;
    honorary: number;
    factoryRevenue: number;
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