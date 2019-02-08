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
  constructor(private userService : UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAllproducts().subscribe((data) => {
      
      console.log(data[1]);
      this.productsList = data[0];
    });
  }

}
