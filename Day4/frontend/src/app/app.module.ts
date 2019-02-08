import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from './user.service';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterPipe} from './filter.pipe';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';

const routes : Routes = [
  {path : 'signup', component : SignupComponent},
  {path : 'login', component : LoginComponent},
  {path : 'products/list', component : ProductListComponent},
  {path: 'products/:id', component : ProductdetailsComponent},
  {path : 'cart/:id', component : CartComponent},
  {path: '' , component: HomePageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProductListComponent,
    FilterPipe,
    ProductdetailsComponent,
    HomePageComponent,
    NavbarComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
