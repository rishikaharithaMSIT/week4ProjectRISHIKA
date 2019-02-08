import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userid : any;
  cartItems : any;
  quantity : any;
  plusstatus=false;

  constructor(private userService : UserService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.userid = this.route.snapshot.params['id'];
    this.getCartItems();
  }
  getCartItems() {
    this.userService.getCartItems(this.userid).subscribe((data) => {
      this.cartItems = data;
      this.cartItems = this.cartItems.cart;
      console.log(this.cartItems);
    });
  }

  increasequant(avail) {
    // this.quantity++;
    // if(this.quantity > avail) {
    //   this.plusstatus = true;
          
    // }
    this.userService.increasecartquant(this.quantity).subscribe((data)=> {


    })
  }

}
