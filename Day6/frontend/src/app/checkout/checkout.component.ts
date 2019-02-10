import { Component, OnInit,ViewChild } from '@angular/core';
import {UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems : any;
  submitted = false;
    
  userid : any;
  user : any;
  totalPrice:number = 0;
  name:any;
  email:any;
  phone : any;
  address : any;
  wall :any;
  red :any = false;
  cart:any;
  newtotal : any;
  ShippingForm: FormGroup;
  payment:any;

  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective;

  constructor(private userService : UserService, private router: Router, private route : ActivatedRoute, private formBuilder: FormBuilder, private flashMessage : FlashMessagesService) { }

  ngOnInit() {

    this.ShippingForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phnum: ['', [Validators.required, Validators.minLength(10)]],
      address : ['', Validators.required]
  });
    this.userid = this.route.snapshot.params['id'];
    if(this.userid == "guest") {
      this.user = false;
    } else {
      this.user = true;
    }
    this.getCartItems();
    //console.log(this.cartItems);
    // for(var i =0;i<this.cartItems.length();i++){
    //   console.log(this.cartItems.cart[i].prodprice);
    //   this.totalPrice = this.cartItems.cart[i].prodprice * this.cartItems.cart[i].quantity;
    // }
  }

  get f() { return this.ShippingForm.controls; }
  getCartItems() {
    this.userService.getCartItems(this.userid).subscribe((data) => {
      if(this.user) {
        this.cartItems = data;
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
      } else {
        this.name = "guest";
        this.cart = data;
        console.log(this.cart);
        for(var i =0;i<this.cart.length;i++){
          // console.log(this.cartItems.cart[i].prodprice);
          this.totalPrice = this.totalPrice + (this.cart[i].prodprice * this.cart[i].quantity);
        }
      }
      
    });
  }
  setAddress(addr) {
    this.address = addr;
  }

  placeGuestOrder(name,phnum,email,address){
    this.submitted = true;
    // console.log(this.address);
    if (this.ShippingForm.invalid) {
      console.log("entered");
      return;
    }
    this.userService.placeOrder(this.userid,
                                name,
                                phnum,
                                email,
                                address,
                                this.cart,
                                this.payment,
                                this.totalPrice,this.wall).subscribe((data) => { 
                                  window.location.href = '/orderCompleted';
    });
  }
  placeOrder(){
    console.log(this.address);
    
    this.userService.placeOrder(this.userid,
                                this.name,
                                this.phone,
                                this.email,
                                this.address,
                                this.cart,
                                this.payment,
                                this.totalPrice, this.wall).subscribe((data) => { 
                                  window.location.href = '/orderCompleted';    
    });
  }
  redeem(){
    this.red = true;
    this.totalPrice = this.totalPrice-this.wall;
    this.wall = 0;
  }
  savePayment(method) {
    this.payment = method;
    console.log(this.payment);
  }
}
