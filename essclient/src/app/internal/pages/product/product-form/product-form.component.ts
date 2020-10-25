import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IProduct, ProductType } from 'src/app/models/IProduct';
import { ProductService, IProductUpdateRequest, IProductCreateRequest } from 'src/app/services/API/product.service';
import { IImage } from './../../../../models/IImage';
import { ICategory } from 'src/app/models/ICategory';
import { CategoryService } from './../../../../services/API/category.service';
import { removeAccents } from 'src/app/utils/stringUtils';
import { FileUploadComponent } from './../../../components/file-upload/file-upload.component';
import { MultipleFileUploadComponent } from './../../../components/multiple-file-upload/multiple-file-upload.component';

// tslint:disable-next-line:no-bitwise
type Type = 'update' | 'add';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{
    ProductType = ProductType;   
    @Output() changeData = new EventEmitter<IProduct>();
    @ViewChild('mainImageUploader') mainImageUploader: FileUploadComponent;
    @ViewChild('galleryUploader') galleryUploader: MultipleFileUploadComponent;
    
    categories: ICategory[];
    activeProduct: IProduct;
    mainImage: IImage;
    gallery: IImage[];
    productForm: FormGroup;
    visible = false;
    isLoading = false;

    get formType (): Type {
        return this.activeProduct ? 'update' : 'add';
    }
    get categoryName (): string { 
        const categoryName = this.categories?.find(c => c.id == this.categoryId.value)?.name; 
        if (!categoryName)
            return '{kategorie}';
        return removeAccents(categoryName).replace(' ', '-').toLowerCase();
    }

    get type () { return this.productForm.get('type'); }
    get categoryId () { return this.productForm.get('categoryId'); }
    get previewName () { return this.productForm.get('previewName'); }
    get name () { return this.productForm.get('name'); }
    get description () { return this.productForm.get('description'); }
    get previewDescription () { return this.productForm.get('previewDescription'); }
    get slug () { return this.productForm.get('slug'); }
    get price () { return this.productForm.get('price'); }
    get stockCount () { return this.productForm.get('stockCount'); }
    get stockPreOrderDays () { return this.productForm.get('stockPreOrderDays'); }

    constructor (
        private _fb: FormBuilder,
        private _productService: ProductService,
        private _categoryService: CategoryService
    ) { 
        this.productForm = _fb.group({
            type: [ProductType.Buy, Validators.required],
            categoryId: [null, Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            previewName: ['', Validators.required],
            previewDescription: ['', Validators.required],
            slug: ['', Validators.required],
            price: [null, [Validators.required, Validators.min(1)]],
            stockCount: [null],
            stockPreOrderDays: [14]
        });
        this.name.valueChanges.subscribe(name => {
            const slug = removeAccents(name).replace(' ', '-').toLowerCase();
            this.slug.setValue(slug);
        });
    }

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this._categoryService.getAll().then(categories => this.categories = categories);
    }

    // price input set currency
    formatterCurrency = (value: number) => value ? `${value} Kč` : '';
    parserCurrency = (value: string) => value ? value.replace(' Kč', '') : '';

    // main image set
    mainImageChanged(image: IImage) {
        this.mainImage = image;
    }

    // gallery set
    galleryChanged(images: IImage[]) {
        this.gallery = images;
    }

    // drawer actions
    open(product: IProduct = null): void {
        this.reset();
        this.type.setValue(ProductType.Buy);
        this.activeProduct = product;
        this.visible = true;
        if (product) {
            this.name.setValue(product.name);
            this.slug.setValue(product.urlName);
            this.previewName.setValue(product.previewName);
            this.description.setValue(product.description);
            this.previewDescription.setValue(product.previewDescription);
            this.price.setValue(product.totalPrice?.czkWithoutVat);
            this.categoryId.setValue(product.categoryId);
            this.gallery = product.gallery;
            this.mainImage = product.image;
            this.stockCount.setValue(product.stock.count);
            this.stockPreOrderDays.setValue(product.stock.preOrderDays);
        }
    }

    close(): void {
        this.visible = false;
        this.activeProduct = null;
    }

    confirm(): void {
        if (this.formType == 'add')
            this.add();
        else if (this.formType == 'update')
            this.update();

    }

    private reset() {
        this.productForm.reset();
        this.mainImageUploader.reset();
        this.galleryUploader.reset();
        this.mainImage = null;
        this.gallery = [];

    }

    private add(): void {
        this.isLoading = true;
        const request: IProductCreateRequest = {
            name: this.name.value,
            urlName: this.slug.value,
            previewName: this.previewName.value,
            image: this.mainImage,
            gallery: this.gallery,
            categoryId: this.categoryId.value,
            description: this.description.value,
            previewDescription: this.previewDescription.value,
            type: this.type.value,
            buy: ProductType.Buy == this.type.value ? {
                priceWithoutVat: this.price.value
            }: null,
            servis: ProductType.Buy == this.type.value ? {
                priceWithoutVat: this.price.value

            }: null,
            deposit: null,
            stock: {
                count: this.stockCount.value ?? 0,
                preOrderDays: this.stockPreOrderDays.value ?? 14,
            }
        };
        this._productService.add(request).subscribe((product: IProduct) => {
            this.changeData.next(product);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }

    private update(): void {
        this.isLoading = true;
        const request: IProductUpdateRequest = {
            id: this.activeProduct?.id,
            name: this.name.value,
            urlName: this.slug.value,
            previewName: this.previewName.value,
            image: this.mainImage,
            gallery: this.gallery,
            categoryId: this.categoryId.value,
            description: this.description.value,
            previewDescription: this.previewDescription.value,
            type: this.type.value,
            buy: ProductType.Buy == this.type.value ? {
                priceWithoutVat: this.price.value
            }: null,
            servis: ProductType.Servis == this.type.value ? {
                priceWithoutVat: this.price.value

            }: null,
            deposit: null,
            stock: {
                count: this.stockCount.value ?? 0,
                preOrderDays: this.stockPreOrderDays.value ?? 14,
            }
        };
        this._productService.update(request).subscribe((product: IProduct) => {
            this.changeData.next(product);
            this.reset();
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
