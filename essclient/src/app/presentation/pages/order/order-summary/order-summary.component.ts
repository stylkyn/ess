import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
    confirmForm: FormGroup;

    constructor(private _formBuilder: FormBuilder) { 
        this.confirmForm = this._formBuilder.group({
            termsAndConditions: [false, Validators.required],
            gpdrTerms: [false, Validators.required]
        });
    }

    ngOnInit() {
        this.confirmForm.valueChanges.subscribe(x => {
            console.log(x);
        });
    }
}
