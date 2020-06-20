import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


// Angular material imports 
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import { AccountInfoComponent } from './account-info/account-info.component'; 
import {MatTabsModule} from '@angular/material/tabs';
import { AddBookComponent } from './add-book/add-book.component'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select'; 
import {MatMenuModule} from '@angular/material/menu'; 

import { AllBooksComponent } from './all-books/all-books.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { UpdateBookComponent } from './manage-books/update-book/update-book.component';
import { CartComponent } from './cart/cart.component';




const routes: Routes = [
  { path : 'signup', component: SignupComponent}, 
  { path: 'signin', component: SigninComponent},
  { path: 'home', component: HomeComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    MenuComponent,
    AccountInfoComponent,
    AddBookComponent,
    AllBooksComponent,
    ManageBooksComponent,
    UpdateBookComponent,
    CartComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
