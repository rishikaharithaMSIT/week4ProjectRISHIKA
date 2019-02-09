import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private flashMessage : FlashMessagesService,private userService : UserService, private router: Router) { }

  ngOnInit() {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get l() { return this.login.controls; }
  checkLogin(username, userpassword) {
    this.submitted = true;
    if (this.login.invalid) {
      return;
    }
    this.userService.login(username, userpassword).subscribe((data)=>{
      if(data) {
        this.router.navigate(['/']);
      } else {
        
        console.log("Not a user");
        this.flashMessage.show("Email/phone or password is incorrect! Try again!",{cssClass :'alert-danger',timeout:5000});

      }
    });
  }
}
