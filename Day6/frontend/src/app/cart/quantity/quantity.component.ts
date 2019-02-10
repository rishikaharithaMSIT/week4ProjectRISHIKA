import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {
  quantity : number = 1;
  minusstatus: any;
  plusstatus: any;
  total: any;
  @Input() max:any;
  @Input() price :any;
  @Input() index: any;
  
  constructor() { }

  ngOnInit() {
    this.total = this.price;
    this.plusstatus = false;
    this.minusstatus = false;
  }

  increasequant() {
    this.minusstatus = false;
    this.quantity = this.quantity + 1;
    if(this.quantity >= 1) {
      this.minusstatus = false;
    }
    if(this.quantity >= this.max){
      this.plusstatus = true;
    }
    // console.log(this.quantity);

    this.total = this.quantity * this.price;
  }

  decreasequant() {
    this.plusstatus = false;
    this.quantity = this.quantity - 1;
    if(this.quantity <= 1) {
      this.minusstatus = true;
    }
    console.log(this.quantity);
    this.total =this.quantity * this.price;
    console.log(this.price);
  }
}
