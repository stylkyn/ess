import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService, IProductUpdateRequest, IProductCreateRequest } from 'src/app/services/API/product.service';
import { IImage } from './../../../../models/IImage';
import { ICategory } from 'src/app/models/ICategory';
import { CategoryService } from './../../../../services/API/category.service';
import { removeAccents } from 'src/app/utils/stringUtils';

// tslint:disable-next-line:no-bitwise
type Type = 'update' | 'add';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{
    @Output() changeData = new EventEmitter<IProduct>();
    
    categories: ICategory[];
    activeProduct: IProduct;
    mainImage: IImage;
    productForm: FormGroup;
    visible = false;
    isLoading = false;

    public get type (): Type {
        return this.activeProduct ? 'update' : 'add';
    }

    get categoryName (): string { 
        const categoryName = this.categories?.find(c => c.id == this.categoryId.value)?.name; 
        if (!categoryName)
            return '{kategorie}';
        return removeAccents(categoryName).replace(' ', '-').toLowerCase();
    }
    get categoryId () { return this.productForm.get('categoryId'); }
    get name () { return this.productForm.get('name'); }
    get slug () { return this.productForm.get('slug'); }

    constructor (
        private _fb: FormBuilder,
        private _productService: ProductService,
        private _categoryService: CategoryService
    ) { 
        this.productForm = _fb.group({
            type: [null, Validators.required],
            categoryId: [null, Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            previewName: ['', Validators.required],
            previewDescription: ['', Validators.required],
            slug: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.loadCategories();
    }

    // categoreis logic
    loadCategories() {
        this._categoryService.getAll()
            .subscribe(categories => this.categories = categories);
    }


    // main image set
    mainImageChanged(image: IImage) {
        console.log(image);
        this.mainImage = image;
    }

    open(product: IProduct = null): void {
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
