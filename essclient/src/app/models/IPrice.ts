export interface IPrice {
    czkWithoutVat: number;
    czkWithVat: number;
    vatPercentage: number;
    vatType: VatTypes;
    priceType: PriceTypes;
}

export const initPrice: IPrice = {
    czkWithoutVat: null,
    czkWithVat: null,
    vatPercentage: null,
    vatType: null,
    priceType: null
};

type VatTypesMapped = 0 | 10 | 15 | 21;
type PriceTypesMapped = 'Kč' | 'Kč/h';

export enum VatTypes {
    Czk0,
    Czk10,
    Czk15,
    Czk21,
}

export enum PriceTypes {
    Czk,
    CzkPerHour
}


export function MapVatTypes (vatTypes: VatTypes): VatTypesMapped {
    switch (vatTypes) {
        case VatTypes.Czk0:
            return 0;
        case VatTypes.Czk10:
            return 10;
        case VatTypes.Czk15:
            return 15;
        case VatTypes.Czk21:
            return 21;
    }
}

export function MapPriceTypes (priceTypes: PriceTypes): PriceTypesMapped {
    switch (priceTypes) {
        case PriceTypes.Czk:
            return 'Kč';
        case PriceTypes.CzkPerHour:
            return 'Kč/h';
    }
}
