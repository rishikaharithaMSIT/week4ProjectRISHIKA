import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList:any;
  //avgRating : any = 0;
  constructor(private userService : UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAllproducts().subscribe((data) => {
      
      console.log(data[1]);
      this.productsList = data[0];
      // var ratingArray = this.productsList;
      // for(var i=0;i<ratingArray.length;i++){
      //   var ratArr = ratingArray[i].rating;
      //   for(var j = 0 ;j<ratArr.length;j++) {
      //     //console.log(ratArr[j])
      //     this.avgRating = this.avgRating + ratArr[j];
      //   }
        
      // }
      // this.avgRating = this.avgRating/ratingArray.length;
    });
  }

}
