import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService, IProductUpdateRequest, IProductCreateRequest } from 'src/app/services/API/product.service';

// tslint:disable-next-line:no-bitwise
type Type = 'update' | 'add';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
    @Output() changeData = new EventEmitter<IProduct>();
    
    activeProduct: IProduct;
    productForm: FormGroup;
    visible = false;
    isLoading = false;

    public get type (): Type {
        return this.activeProduct ? 'update' : 'add';
    }

    get name () { return this.productForm.get('name'); }
    get slug () { return this.productForm.get('slug'); }

    constructor (
        private _fb: FormBuilder,
        private _productService: ProductService
    ) { 
        this.productForm = _fb.group({
            name: ['', Validators.required],
            slug: ['', Validators.required],
        });
    }

    open(product: IProduct): void {
        this.activeProduct = product;
        this.visible = true;
        if (product) {
            this.name.setValue(product?.name);
            this.slug.setValue(product?.urlName);
        }
    }

    close(): void {
        this.visible = false;
        this.productForm.reset();
        this.activeProduct = null;
    }

    confirm(): void {
        if (this.type == 'add')
            this.add();
        else if (this.type == 'update')
            this.update();
    }

    private add(): void {
        this.isLoading = true;
        const request: IProductCreateRequest = {
        };
        this._productService.add(request).subscribe((product: IProduct) => {
            this.changeData.next(product);
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }

    private update(): void {
        this.isLoading = true;
        const request: IProductUpdateRequest = {
            id: this.activeProduct?.id,
            name: this.name.value,
            urlName: this.slug.value
        };
        this._productService.update(request).subscribe((product: IProduct) => {
            this.changeData.next(product);
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
