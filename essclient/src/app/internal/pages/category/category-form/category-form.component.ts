import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ILoginRequest } from 'src/app/services/API/user.service';
import { CategoryService, ICategoryCreateRequet } from './../../../../services/API/category.service';
import { ICategory } from 'src/app/models/ICategory';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
    @Output() changeData = new EventEmitter<ICategory>();
    
    categoryForm: FormGroup;
    visible = false;
    isLoading = false;

    get name () { return this.categoryForm.get('name'); }
    get slug () { return this.categoryForm.get('slug'); }

    constructor (
        private _fb: FormBuilder,
        private _categoryService: CategoryService
    ) { 
        this.categoryForm = _fb.group({
            name: ['', Validators.required],
            slug: ['', Validators.required],
        });
    }


    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    confirm(): void {
            this.isLoading = true;
            const request: ICategoryCreateRequet = {
            name: this.name.value,
            urlName: this.slug.value
        };
        this._categoryService.add(request).subscribe((category: ICategory) => {
            this.changeData.next(category);
            this.close();
            this.isLoading = false;
        }, (e) => this.isLoading = false);
    }
}
