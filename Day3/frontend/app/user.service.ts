import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:4000';
  constructor(private http : HttpClient) { }
  //SignUp user
  addUser(name, phone, email, password) {
    const user = {
      name: name,
      email:email,
      phone : phone,
      password:password,
      address : [],
      wallet : 0.0
    };
    return this.http.post(`${this.uri}/user/add`,user);
  }

  //SignIn user

  login(username, password) {

    // var loginuser = {};
    // var reg = new RegExp('^[0-9]+$');
    // if(reg.test(username)){
    //   loginuser = {
    //     phone : username,
    //     password : password
    //   };
    //   return this.http.post(`${this.uri}/user/login?item=phone`, loginuser);
    // } 
     var loginuser = {
        username : username,
        password : password
      };
      return this.http.post(`${this.uri}/user/login`, loginuser);
  }
}
