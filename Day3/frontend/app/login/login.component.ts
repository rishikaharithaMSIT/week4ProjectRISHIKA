import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private userService : UserService, private router: Router) { }

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
        this.router.navigate(['/signup']);
      } else {
        console.log("Not a user");
      }
    });
  }
}
