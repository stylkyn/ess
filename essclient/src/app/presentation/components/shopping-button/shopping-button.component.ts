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

    @Output()
    changed = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }

    changeCount(count: number) {
        if (count <= 0) {
            this.changed.emit(0);
            return;
        }
        
        this.changed.emit(count);
    }

    addOne() {
        this.changed.emit(this.productsCount + 1);
    }

    deductOne() {
        this.changed.emit(this.productsCount - 1);
    }
}
