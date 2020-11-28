import { Injectable } from '@angular/core';

const basketLocalStorageName = 'basket';

export interface IBasket {
    products: IBasketProductStorage[];
}

export interface IBasketProductStorage {
    productId: string;
    productsCount: number;
    serviceDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BasketStorageService {
    public productsInStorage: IBasketProductStorage[] = [];

    constructor() {
        this.loadProductsFromStorage();
    }

    public hasService (): boolean {
        return this.productsInStorage.some(product => product.serviceDate);
    }

    public findSelectedProduct(productId: string): IBasketProductStorage {
        return this.productsInStorage.find(x => x.productId === productId);
    }

    public removeProduct(productId: string) {
        const productIndex = this.productsInStorage.findIndex(x => x.productId === productId);
        if (productIndex >= 0) {
            this.productsInStorage.splice(productIndex, 1);
        }
        this.setProductsToStorage();
    }

    public setProduct(product: IBasketProductStorage) {
        const productIndex = this.productsInStorage.findIndex(x => x.productId === product.productId);
        if (productIndex >= 0) {
            this.productsInStorage[productIndex].productsCount = product.productsCount;
        } else {
            this.productsInStorage.push(product);
        }
        this.setProductsToStorage();
    }

    public reset() {
        this.productsInStorage = [];
        localStorage.removeItem(basketLocalStorageName);
    }

    private setProductsToStorage() {
        const basket: IBasket = {
            products: this.productsInStorage
        };
        localStorage.setItem(basketLocalStorageName, JSON.stringify(basket));
    }

    private loadProductsFromStorage() {
        const basket: IBasket = JSON.parse(localStorage.getItem(basketLocalStorageName));
        if (basket) {
            this.productsInStorage = basket.products;
        }
    }
}
