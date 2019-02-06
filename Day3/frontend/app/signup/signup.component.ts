import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private userService : UserService, private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phnum: ['', [Validators.required, Validators.minLength(10)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        // console.log(controls.firstName.touched);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    onSubmit(name, phone, email, password) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      //alert('SUCCESS!! :-)');
      this.userService.addUser(name,phone,email,password).subscribe(( ) => {
        this.router.navigate(['/signup']);
      });
  }
}