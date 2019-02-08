import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  id : any;
  product : any;
  userid :any;
  comment: any;
  constructor(private userService : UserService, private router: Router, private route : ActivatedRoute) { 
    
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getproduct();
  }

  getproduct() {
    this.userService.getproduct(this.id).subscribe((data) => {
      this.product = data[0];
      this.userid = data[1];
    })
  }

  addtocart(id) {
    var quan : any = 1;
    this.userService.addtocart(this.userid, id,this.product.name,this.product.image,this.product.price,this.product.availability, quan).subscribe((data) => {
      if(data) {
        alert("Product added to cart successfully");
      } else {
        alert("You are a guest!!! Please Log In");
      }
    });
  }

  saveComment() {
    this.userService.saveComment(this.userid, this.product._id , this.comment).subscribe((data) => {
       this.comment = "";
    });
    window.location.reload();
  }
}
