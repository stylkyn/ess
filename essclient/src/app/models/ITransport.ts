import { IImage } from './IImage';
import { IPrice } from './IPrice';

export interface ITransport {
    id: string;
    type: TransportType;
    isActive: boolean;
    name: string;
    description: string;
    image: IImage;
    totalPrice: IPrice;
}

export const getTransportTypeName = (type: TransportType) => {
    switch (type) {
        case TransportType.PersonalPickup:
            return 'Osobní vyzvednutí';
        case TransportType.PersonalDelivery:
            return 'Osobní doručení';
        case TransportType.HomeDelivery:
            return 'Doručení na adresu';
        case TransportType.DeliveryPoint:
            return 'Doručení na výdejní místo';
    }
    return '';
};

export enum TransportType {
    PersonalPickup,
    PersonalDelivery,
    HomeDelivery,
    DeliveryPoint
}
