import { IPrice } from './IPrice';

export interface ITransport {
    id: string;
    type: TransportType;
    isActive: boolean;
    name: string;
    description: string;
    logoUrl: string;
    personalPickup: IPersonalPickupTransport;
    czechPost: ICzechPostTransport;
    zasilkovna: IZasilkovnaTransport;
    totalPrice: IPrice;
}

// tslint:disable-next-line:no-empty-interface
export interface IPersonalPickupTransport { }

// Ceska Posta
export interface ICzechPostTransport {
    places: ICzechPostTransportOption[];
}

export interface ICzechPostTransportOption {
    name: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IZasilkovnaTransport {
}

export enum TransportType {
    PersonalPickup,
    CzechPost,
    Zasilkovna
}
