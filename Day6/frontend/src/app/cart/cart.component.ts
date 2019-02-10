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
  result : Number;
  cartLength : any = true;
  constructor(private userService : UserService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.userid = this.route.snapshot.params['id'];
     
    this.getCartItems();
  }
  getCartItems() {
    this.userService.getCartItems(this.userid).subscribe((data) => {
      console.log(data);
      if(this.userid == "guest") {
        this.cartItems = data;
        if(this.cartItems.length > 0) {
          this.cartLength = false;
        }
        
        return;
      }
      this.cartItems = data;
      if(this.cartItems.cart.length > 0) {
        this.cartLength = false;
      }
      this.cartItems = this.cartItems.cart;
      
      console.log(this.cartItems);
    });
  }

  decreasequant(i, prodid) {
    this.result = Number((document.getElementById("quan" + i) as HTMLInputElement).value);
    if(this.result > 1) {
      this.result = Number(this.result) - 1;
      if(this.result >= 1) {
        (document.getElementById("quan" + i) as HTMLInputElement).value = String(this.result);
      }
      this.userService.changeCartQuant(this.result, this.userid, prodid).subscribe((data)=> {
        console.log(data);
      });
    }
      

  }

  increasequant(i,maxAvail, prodid) {
    this.result = Number((document.getElementById("quan" + i) as HTMLInputElement).value);
    if (this.result < maxAvail) {
      this.result = Number(this.result) + 1;
      // (document.getElementById("quan" + i) as HTMLInputElement).value = String(this.result);
      console.log(maxAvail + " avail");
      if(this.result <= maxAvail) {
        (document.getElementById("quan" + i) as HTMLInputElement).value = String(this.result);
      }
      this.userService.changeCartQuant(this.result, this.userid, prodid).subscribe((data)=> {
        console.log(data);
      });
    }
    
  }

  removeItem(prodid):any {
    this.userService.removeCartItem(this.userid,prodid).subscribe(() => {
      window.location.reload();
    });
  }
  checkOut() {
    this.router.navigate(['/checkoutPage/'+this.userid]);
  }
}
