import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user :any;
  userId : any;
  constructor(private userService : UserService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    
  }
  
}
