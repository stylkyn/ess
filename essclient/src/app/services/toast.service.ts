import { Injectable } from '@angular/core';
import { ToastService, IndividualConfig } from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})
export class MyToastService {
    options: IndividualConfig = {
        closeButton: true,
        progressBar: false,
        tapToDismiss: true,
        opacity: 0.9,
        timeOut: 1500,
    };

    constructor(private _toastService: ToastService) { }

    public showSuccess(title: string, message: string = null) {
        return this._toastService.success(message, title, this.options);
    }
}
