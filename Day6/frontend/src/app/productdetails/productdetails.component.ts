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
  rating;
  ratingClicked: number;
  itemIdRatingClicked: string;
  avgRating : any = 0;
  constructor(private userService : UserService,  private flashMessage : FlashMessagesService,private router: Router, private route : ActivatedRoute) { 
    
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getproduct();
    // this.commentadded = false;
  }

  ratingComponentClick(clickObj: any): void {
    // const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    
      this.rating = clickObj.rating;
      //console.log(this.rating);
      this.ratingClicked = clickObj.rating;
      //console.log(this.ratingClicked);
      // this.itemIdRatingClicked = item.company;

  }

  getproduct() {
    this.userService.getproduct(this.id).subscribe((data) => {
      this.product = data[0];
      this.userid = data[1];
      var ratingArray = this.product.rating;
      for(var i=0;i<ratingArray.length;i++){
        this.avgRating = this.avgRating + ratingArray[i];
      }
      this.avgRating = this.avgRating/ratingArray.length;
    });
  }

  addtocart(id) {
    var quan : any = 1;
    // if(this.userid == "guest") {

    //   //alert("You are a guest!!! Please Log In");
    //   // this.flashMessage.show("You are a guest!!! Please Log In",{cssClass :'alert-warning',timeout:5000});
    //   return;
    // }
    this.userService.addtocart(this.userid, id,this.product.name,this.product.image,this.product.price,this.product.availability, quan).subscribe((data) => {
      console.log(data);
      if(data == "exists"){
        //alert("Product already exists");
        this.flashMessage.show("Product already exists",{cssClass :'alert-danger',timeout:5000});
      }
      else if(data  == true) {
        //alert("Product added to cart successfully");
        this.flashMessage.show("Product added to cart successfully",{cssClass :'alert-success',timeout:5000});
      }
      // } else {
      //   //alert("You are a guest!!! Please Log In");
      //   this.flashMessage.show("You are a guest!!! Please Log In",{cssClass :'alert-warning',timeout:5000});
      // }
    });
  }

  

  saveComment() {
    console.log(this.comment);
    console.log(this.ratingClicked);
    if(this.comment == "") {
      this.commentadded = true;
      console.log(this.commentadded);
      return;
    }
    this.userService.saveComment(this.userid, this.product._id , this.comment, this.rating).subscribe((data) => {
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
