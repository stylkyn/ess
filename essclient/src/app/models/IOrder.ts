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
    orderNumberFormatted: string;
    service: IOrderService;
    customer: IOrderCustomer;
    transport: IOrderTransport;
    payment: IOrderPayment;
    calculatedData: ICalculatedOrder;
}

export interface IOrderService {
    date: Date;
    userId: string; // agent id
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
    WaitForPaid, // wait for paid

    ReadyToPickup,
    ReadyToShip,
    Sent,
    Delivered,

    AgentAssign,
    AgentReady,
    AgentOnWay,

    Finished
}

export const OrderStateName = (state: OrderState) => {
    switch(state) {
        case OrderState.Created:
            return 'Vytvořená';
        case OrderState.CalculateReady:
            return 'Uložen výpočet';
        case OrderState.TransportReady:
            return 'Uložena doprava';
        case OrderState.PaymentReady:
            return 'Uložena platba';
        case OrderState.CustomerReady:
            return 'Uloženy osobní údaje';
        case OrderState.Confirmed:
            return 'Potvrzená';
        case OrderState.WaitForPaid:
            return 'Zaplacená';
        case OrderState.ReadyToPickup:
            return 'Připravena k vyzvednutí';
        case OrderState.ReadyToShip:
            return 'Připravena k odeslání';
        case OrderState.Sent:
            return 'Odeslaná';
        case OrderState.Delivered:
            return 'Doručená';
        case OrderState.AgentAssign:
            return 'Čeká na přiřazení agenta';
        case OrderState.AgentReady:
            return 'Agent připraven';
        case OrderState.AgentOnWay:
            return 'Agent na cestě';
        case OrderState.Finished:
            return 'Dokončená';
    }
    return '';
};


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
            states.push({ type:  OrderState.WaitForPaid, label: 'Čeká na zaplacení'});
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