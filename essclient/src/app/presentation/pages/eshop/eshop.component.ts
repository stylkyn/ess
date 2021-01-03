import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../../services/API/category.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/API/product.service';
import { presentationProductRoute } from '../../theme/presentation-routes';

@Component({
  selector: 'app-eshop',
  templateUrl: './eshop.component.html',
  styleUrls: []
})
export class EshopComponent implements OnInit {

    presentationProductRoute = presentationProductRoute;

    constructor(
        public _categoryService: CategoryService, 
        public _productService: ProductService) {
    }

    ngOnInit() {
        this._categoryService.fetchTree();
    }

}
