import { IUserPersonal, IUserCompany } from "./IUser";
import { IPayment, PaymentState } from "./IPayment";
import { ICalculatedOrder } from "./ICalculateOrder";
import { ITransport } from "./ITransport";
import { PaymentType } from 'src/app/models/IPayment';
import { TransportType } from 'src/app/models/ITransport';

export interface IOrder {
    id: string;
    state: OrderState;
    orderNumber: number;
    customer: IOrderCustomer;
    transport: IOrderTransport;
    payment: IOrderPayment;
    calculatedData: ICalculatedOrder;
}

export interface IOrderTransport {
    transportId: string;
    personalPickup: IOrderPersonalPickupTransport;
    czechPost: IOrderCzechPostTransport;
    zasilkovna: IOrderZasilkovnaTransport;
    sourceData: ITransport;
}
export interface IOrderPersonalPickupTransport {
}
export interface IOrderCzechPostTransport {
}
export interface IOrderZasilkovnaTransport {
}

export interface IOrderPayment {
    paymentId: string;
    state: PaymentState;
    paymentOrder: IOrderPaymentOrder;
    orderCashOnDelivery: IOrderCashOnDeliveryRespoonse;
    sourceData: IPayment;
}
export interface IOrderPaymentOrder {
}
export interface IOrderCashOnDeliveryRespoonse {
}

export interface IOrderCustomer {
    userId: string;
    personal: IUserPersonal;
    company: IUserCompany;
}

export enum OrderState {
    Created,

    CalculateReady,
    TransportReady,
    PaymentReady,
    CustomerReady,

    Confirmed,
    Paid,
    ReadyToPickup,

    ReadyToShip,
    Sent,
    Delivered,
}


export interface IOrderStateOption {
    type: OrderState;
    label: string;
}

export const orderSummaryStates = (order: IOrder): IOrderStateOption[] => {
    if (order == null) return [];

    const transportType: TransportType = order.transport?.sourceData?.type;
    const paymentType: PaymentType = order.payment?.sourceData?.type;
    const states: IOrderStateOption[] = [{ type:  OrderState.Confirmed, label: 'Přijatá'}];

    // payments states
    switch(paymentType) {
        case PaymentType.PaymentOrder:
            states.push({ type:  OrderState.Paid, label: 'Zaplacená'});
            break;
        case PaymentType.CashOnDelivery:
            break;
    }

    // transport states
    switch(transportType) {
        case TransportType.PersonalPickup:
            states.push({ type:  OrderState.ReadyToPickup, label: 'Připravena k vyzvednutí'});
            break;
        case TransportType.CzechPost:
        case TransportType.Zasilkovna:
            states.push(
                { type:  OrderState.ReadyToShip, label: 'Připravena k odeslání'},
                { type:  OrderState.Sent, label: 'Odeslána'},
                { type:  OrderState.Delivered, label: 'Doručena'});

    }
    return states;
};