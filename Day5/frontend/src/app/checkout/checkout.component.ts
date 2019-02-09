import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems : any;
  userid : any;

  totalPrice:number = 0;
  name:any;
  email:any;
  phone : any;
  address : any;
  wall :any;
  red :any = false;
  cart:any;
  newtotal : any;

  constructor(private userService : UserService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.userid = this.route.snapshot.params['id'];
    this.getCartItems();
    //console.log(this.cartItems);
    // for(var i =0;i<this.cartItems.length();i++){
    //   console.log(this.cartItems.cart[i].prodprice);
    //   this.totalPrice = this.cartItems.cart[i].prodprice * this.cartItems.cart[i].quantity;
    // }
  }
  getCartItems() {
    this.userService.getCartItems(this.userid).subscribe((data) => {
      this.cartItems = data;
      console.log(this.cartItems);
      this.name =this.cartItems.name;
      this.phone = this.cartItems.phone;
      this.email = this.cartItems.email;
      this.cart = this.cartItems.cart;
      this.wall = this.cartItems.wallet;
      //console.log(this.cartItems);
      for(var i =0;i<this.cartItems.cart.length;i++){
          console.log(this.cartItems.cart[i].prodprice);
          this.totalPrice = this.totalPrice + (this.cartItems.cart[i].prodprice * this.cartItems.cart[i].quantity);
        }
    });
  }
  setAddress(addr) {
    this.address = addr;
  }
  placeOrder(){
    console.log(this.address);
    
    this.userService.placeOrder(this.userid,
                                this.name,
                                this.phone,
                                this.email,
                                this.address,
                                this.cart,
                                this.totalPrice, this.wall).subscribe((data) => { 
                                  window.location.href = '/orderCompleted';    
    });
  }
  redeem(){
    this.red = true;
    this.totalPrice = this.totalPrice-this.wall;
    this.wall = 0;
  }
}
