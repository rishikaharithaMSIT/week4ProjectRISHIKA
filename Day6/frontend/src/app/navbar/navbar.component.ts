import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user :any;
  userId : any;
  constructor(private userService : UserService, private router: Router, private route : ActivatedRoute) { 
    this.getUserorNot();
  }

  ngOnInit() {
    this.getUserorNot();
  }
  getUserorNot() {
    this.userService.getUser().subscribe((data) => {
      console.log(data);
      this.userId = data;      
      if(data == "guest") {
        this.user = false;
      } else {
        this.user = true;
      }
    });
  }

  logout() {
    this.userService.logout().subscribe((data) => {
      console.log("Logged out");
      if(data) {
        window.location.href = '/';
        // window.location.reload();
      }
      
    });
  }

}
