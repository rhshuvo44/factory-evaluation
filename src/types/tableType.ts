
export type PaymentType = 'Monthly' | 'Day' | 'Once';

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

