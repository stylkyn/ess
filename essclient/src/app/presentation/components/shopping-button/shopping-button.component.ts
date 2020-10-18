import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';

@Component({
  selector: 'app-shopping-button',
  templateUrl: './shopping-button.component.html',
  styleUrls: ['./shopping-button.component.scss']
})
export class ShoppingButtonComponent implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @HostBinding('class')
    @Input('class') classList = '';

    @Input()
    productsCount = 0;

    @Input()
    maxCount = 10;

    @Output()
    changed = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }

    changeCount(count: number) {
        if (count <= this.maxCount) {
            this.changed.emit(0);
            return;
        }

        if (count > this.maxCount) {
            return this.productsCount = 10;
        }
        
        this.changed.emit(count);
    }

    addOne() {
        if (this.productsCount == this.maxCount)
            return;

        this.changed.emit(this.productsCount + 1);
    }

    deductOne() {
        this.changed.emit(this.productsCount - 1);
    }
}
