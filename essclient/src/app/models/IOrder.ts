import { IUserPersonal, IUserCompany } from "./IUser";
import { IPayment, PaymentState } from "./IPayment";
import { ICalculatedOrder } from "./ICalculateOrder";
import { ITransport } from "./ITransport";
import { PaymentType } from 'src/app/models/IPayment';
import { TransportType } from 'src/app/models/ITransport';

export interface IOrder {
    lastModified: Date;
    createdDate: Date;
    id: string;
    state: OrderState;
    paymentState: PaymentState;
    orderNumber: number;
    orderNumberFormatted: string;
    customer: IOrderCustomer;
    calculatedData: ICalculatedOrder;
}

export const orderInit: IOrder = {
    lastModified: undefined,
    createdDate: undefined,
    id: undefined,
    state: undefined,
    paymentState: undefined,
    orderNumber: undefined,
    orderNumberFormatted: undefined,
    customer: undefined,
    calculatedData: undefined,
};

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

    const transportType: TransportType = order.calculatedData.transport?.sourceData?.type;
    const paymentType: PaymentType = order.calculatedData.payment?.sourceData?.type;
    const states: IOrderStateOption[] = [{ type:  OrderState.Confirmed, label: OrderStateName(OrderState.Confirmed)}];

    // payments states
    switch(paymentType) {
        case PaymentType.PaymentOrder:
            states.push({ type:  OrderState.WaitForPaid, label: OrderStateName(OrderState.WaitForPaid)});
            break;
        case PaymentType.CashOnDelivery:
            break;
    }

     // // service states
    const hasService = order.calculatedData.products.some(product => product.service);
    if (hasService) {
        states.push({ type:  OrderState.AgentAssign, label: OrderStateName(OrderState.AgentAssign)});
        states.push({ type:  OrderState.AgentReady, label: OrderStateName(OrderState.AgentReady)});
    }

    // transport states
    switch(transportType) {
        case TransportType.PersonalPickup:
            states.push({ type:  OrderState.ReadyToPickup, label: OrderStateName(OrderState.ReadyToPickup)});
            break;
        case TransportType.DeliveryPoint:
            states.push(
                { type:  OrderState.ReadyToShip, label: OrderStateName(OrderState.ReadyToShip)},
                { type:  OrderState.Sent, label: OrderStateName(OrderState.Sent)},
                { type:  OrderState.ReadyToPickup, label: OrderStateName(OrderState.ReadyToPickup)},
            );
            break;
        case TransportType.PersonalDelivery:
            states.push({ type:  OrderState.AgentOnWay, label: OrderStateName(OrderState.AgentOnWay)});
            break;
        case TransportType.HomeDelivery:
            states.push(
                { type:  OrderState.ReadyToShip, label: OrderStateName(OrderState.ReadyToShip)},
                { type:  OrderState.Sent, label: OrderStateName(OrderState.Sent)},
                { type:  OrderState.Delivered, label: OrderStateName(OrderState.Delivered)}
            );
    }
    return states;
};