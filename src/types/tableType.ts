
export type PaymentType = 'Monthly' | 'Day' | 'Once';
export type userRole = "admin" | "executive-director" | "managing-director" | "general-director" | "coordinator"

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
    water: string;
    electricity: string;
    others?: string;
}

export type TUSer = {
    name: number;
    email: string;
    password: string;
    phone: string;
    role: userRole;
    address: string;
}

