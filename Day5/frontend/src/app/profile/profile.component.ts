import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails :any;
  userid : any;
  newaddress = "";
  constructor(private userService : UserService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.userid = this.route.snapshot.params['id'];
    this.getCartItems();
  }
  getCartItems() {
    this.userService.getCartItems(this.userid).subscribe((data) => {
      this.userDetails = data;
      console.log(this.userDetails);
    });
  
    
  
}
addaddress() {
  
    if(this.newaddress != "") {
      this.userService.addAddress(this.userid,this.newaddress).subscribe((data) => {
        console.log(data);
        window.location.href = '/profile/'+this.userid;
      });
  }
}
}
