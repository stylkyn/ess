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

    public showError(title: string, message: string = null) {
        const options = {...this.options};
        options.timeOut = 4000;
        return this._toastService.error(message, title, this.options);
    }

    public showWarning(title: string, message: string = null) {
        const options = {...this.options};
        options.timeOut = 3000;
        return this._toastService.warning(message, title, this.options);
    }
}
