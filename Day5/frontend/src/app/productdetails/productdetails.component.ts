import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  id : any;
  commentadded : any = false;
  product : any;
  userid :any;
  comment: any = "";
  constructor(private userService : UserService,  private flashMessage : FlashMessagesService,private router: Router, private route : ActivatedRoute) { 
    
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getproduct();
    // this.commentadded = false;
  }

  getproduct() {
    this.userService.getproduct(this.id).subscribe((data) => {
      this.product = data[0];
      this.userid = data[1];
    })
  }

  addtocart(id) {
    var quan : any = 1;
    if(this.userid == "guest") {
      //alert("You are a guest!!! Please Log In");
      this.flashMessage.show("You are a guest!!! Please Log In",{cssClass :'alert-warning',timeout:5000});
      return;
    }
    this.userService.addtocart(this.userid, id,this.product.name,this.product.image,this.product.price,this.product.availability, quan).subscribe((data) => {
      console.log(data);
      if(data == "exists"){
        //alert("Product already exists");
        this.flashMessage.show("Product already exists",{cssClass :'alert-danger',timeout:5000});
      }
      else if(data  == "true") {
        //alert("Product added to cart successfully");
        this.flashMessage.show("Product added to cart successfully",{cssClass :'alert-success',timeout:5000});
      } else {
        //alert("You are a guest!!! Please Log In");
        this.flashMessage.show("You are a guest!!! Please Log In",{cssClass :'alert-warning',timeout:5000});
      }
    });
  }

  saveComment() {
    console.log(this.comment);
    if(this.comment == "") {
      this.commentadded = true;
      console.log(this.commentadded);
      return;
    }
    this.userService.saveComment(this.userid, this.product._id , this.comment).subscribe((data) => {
       this.comment = "";
    });
    window.location.reload();
  }

  sharefunc(){
    this.userService.addtowallet(this.userid).subscribe((data) => {
      if(data) {
        alert(" Thanks for sharing !!. 10 rs will be added to your wallet ");
      }
      else{

      }
    });

  }
  
}
