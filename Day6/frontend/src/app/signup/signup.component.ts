import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { pwdvalidator } from './cnfrmpwdvalidator';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;
    

    constructor(private formBuilder: FormBuilder, private userService : UserService, private flashMessage : FlashMessagesService,private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phnum: ['', [Validators.required, Validators.minLength(10)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            cnfrmpwd: ['', [Validators.required, Validators.minLength(6), pwdvalidator]],
            address : ['']
        });
        // console.log(controls.firstName.touched);
        this.registerForm.controls.password.valueChanges.subscribe(
          x => this.registerForm.controls.cnfrmpwd.updateValueAndValidity());
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    onSubmit(name, phone, email,address,password) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      //alert('SUCCESS!! :-)');
      console.log(address + "adress");
      this.userService.addUser(name,phone,email,address,password).subscribe((data) => {
        console.log(data);
        if(data) {
          this.flashMessage.show("Email or phone already exists!",{cssClass :'alert-danger',timeout:5000});
        }
        else {
          this.router.navigate(['/login']);
        }
        //this.router.navigate(['/login']);
      });
  }
}