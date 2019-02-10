import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:4000';
  user : any;
  constructor(private http : HttpClient) { }
  //------------------------------------------------------------------------
  //SignUp user
  addUser(name, phone, email,address,password) {
    this.user = {
      name: name,
      email:email,
      phone : phone,
      password:password,
      address : [address],
      cart : [],
      wallet : 0.0
    };
    if(address == "" ) {
      this.user = {
        name: name,
        email:email,
        phone : phone,
        password:password,
        address : [],
        cart : [],
        wallet : 0.0
      }
    }
    return this.http.post(`${this.uri}/user/add`,this.user);
  }

  //SignIn user
  login(username, password) {

    var loginuser = {
        username : username,
        password : password
      };
      return this.http.post(`${this.uri}/user/login`, loginuser);
  }
  //-----------------------------------------------------------------------------------

  getAllproducts(){
    return this.http.get(`${this.uri}/getallProducts`);
  }

  getproduct(id:any) {
    //console.log(id);
    return this.http.get(`${this.uri}/getproduct/${id}`);
  }

  //----------------------------------------------------------------------------------------

  addtocart(userid : any, prodid : any, prodname, prodimg, prodprice,availability,quantity:any) {
    console.log(prodname + "prodname");
    var usercatprods = {
      userid : userid,
      prodid : prodid,
      prodname : prodname,
      prodimg : prodimg,
      prodprice:prodprice,
      availability:availability,
      quantity : quantity
    }
    return this.http.post(`${this.uri}/user/addcart`, usercatprods);
  }

  saveComment(userid : any,prodid : any,comment : any, rating : any) {
    console.log(rating);
     var commentarray = {
       userid : userid,
       prodid : prodid,
       comment : comment,
       rating : rating
     }
     return this.http.post(`${this.uri}/product/comment`, commentarray);
  }
  //----------------------------
  getCartItems(userid) {
    return this.http.get(`${this.uri}/getCartItems/${userid}`);
  }

  changeCartQuant(i, userid, prodid) {
    var cartUpdatedetails = {
      userid : userid,
      quantity : i,
      prodid : prodid
    }
    return this.http.post(`${this.uri}/user/changeCart`, cartUpdatedetails);
  }
  removeCartItem(userid, prodid) {
    var cartDetails = {
      userid : userid,
      prodid : prodid
    }
    return this.http.post(`${this.uri}/user/removeFromCart`, cartDetails);
  }
  getUser(){
    return this.http.get(`${this.uri}/user`);
  }
  logout() {
    return this.http.get(`${this.uri}/logout`);
  }
  placeOrder(userid,name,phone,email,address,cart,payment,totalPrice,wallet){
    console.log("entered");
    var orderDetails = {
      userid :userid,
      name :name,
      phone : phone,
      email : email,
      address: address,
      cart : cart,
      totalPrice :totalPrice,
      payment : payment,
      wallet : wallet
    }
    return this.http.post(`${this.uri}/orders/add`, orderDetails);

  }
  addtowallet(userid : any){
    var useridobj = {
      userid:userid
    }
    return this.http.post(`${this.uri}/user/wallet`, useridobj);
  }
  addAddress(userid,address){
    var addr = {
      userid : userid,
      address :  address
    }
    return this.http.post(`${this.uri}/user/addAddress`, addr);
  }
}
