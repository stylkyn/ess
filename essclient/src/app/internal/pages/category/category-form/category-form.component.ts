import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoryService, ICategoryCreateRequest, ICategoryUpdateRequest } from './../../../../services/API/category.service';
import { ICategory } from 'src/app/models/ICategory';
import { urlSlugPattern } from 'src/app/utils/regexUtils';
import { removeAccents } from 'src/app/utils/stringUtils';
import { FileUploadComponent } from 'src/app/internal/components/file-upload/file-upload.component';
import { IImage } from 'src/app/models/IImage';

// tslint:disable-next-line:no-bitwise
type Type = 'update' | 'add';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
    @Output() changeData = new EventEmitter<ICategory>();
    @ViewChild('mainImageUploader') mainImageUploader: FileUploadComponent;

    urlSlugPattern = urlSlugPattern;

    activeCategory: ICategory;
    categoryForm: FormGroup;
    mainImage: IImage;
    visible = false;
    isLoading = false;

    public get type (): Type {
        return this.activeCategory ? 'update' : 'add';
    }

    public get categories (): ICategory[] {
        return this._categoryService.categories;
    }

    get isActive () { return this.categoryForm.get('isActive'); }
    get name () { return this.categoryForm.get('name'); }
    get slug () { return this.categoryForm.get('slug'); }

    constructor (
        private _fb: FormBuilder,
        private _categoryService: CategoryService
    ) {
        this.categoryForm = _fb.group({
            name: ['', Validators.required],
            isActive: [true, Validators.required],
            slug: ['', [Validators.required, Validators.maxLength(30)]],
        }, {
            validators: (groups: any) => {
                const isDuplicate = this.categories.find(category => category.urlName == groups.value.slug && category.id != this.activeCategory?.id);
                if (isDuplicate) {
                    groups.controls.slug.setErrors({ slug: true });
                    return { slug: true };
                }
            }
        });
        this.name.valueChanges.subscribe(name => {
            const slug = removeAccents(name).split(' ').join('-').toLowerCase();
            this.slug.setValue(slug);
        });
    }

    ngOnInit() {
        this._categoryService.getAll();
    }

    open(category: ICategory = null): void {
        this.activeCategory = category;
        this.isActive.setValue(true);
        this.visible = true;
        this.mainImage = undefined;
        if (category) {
            this.name.setValue(category.name);
            this.slug.setValue(category.urlName);
            this.isActive.setValue(category.isActive);
            this.mainImage = category.image;
        }
    }

    close(): void {
        this.visible = false;
        this.categoryForm.reset();
        this.mainImage = null;
        this.activeCategory = null;
    }

    confirm(): void {
        if (this.type == 'add')
            this.add();
        else if (this.type == 'update')
            this.update();
    }

    // main image set
    mainImageChanged(image: IImage) {
        this.mainImage = image;
    }

    private add(): void {
        this.isLoading = true;
        const request: ICategoryCreateRequest = {
            name: this.name.value,
            urlName: this.slug.value,
            isActive: this.isActive.value,
            image: this.mainImage,
        };
        this._categoryService.add(request).subscribe((category: ICategory) => {
            this.changeData.next(category);
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }

    private update(): void {
        this.isLoading = true;
        const request: ICategoryUpdateRequest = {
            id: this.activeCategory?.id,
            name: this.name.value,
            urlName: this.slug.value,
            isActive: this.isActive.value,
            image: this.mainImage,
        };
        this._categoryService.update(request).subscribe((category: ICategory) => {
            this.changeData.next(category);
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
