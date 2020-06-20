import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from 'src/app/signup/signup.component'
import {SigninComponent} from 'src/app/signin/signin.component'
import { HomeComponent } from './home/home.component'
import {AccountInfoComponent} from './account-info/account-info.component'
import {AllBooksComponent} from './all-books/all-books.component'
import {AddBookComponent} from './add-book/add-book.component'
import {UpdateBookComponent} from './manage-books/update-book/update-book.component'
import {CartComponent} from './cart/cart.component'
import {ManageBooksComponent} from './manage-books/manage-books.component'
const routes: Routes = [
  { path : 'signup', component: SignupComponent},
  { path : 'signin', component: SigninComponent},
  { path: 'home', component: HomeComponent},
  { path: 'account', component: AccountInfoComponent},
  { path: 'books', component: AllBooksComponent},
  { path: 'books/update/:bookId', component: UpdateBookComponent, pathMatch:'full'},
  { path: 'cart', component: CartComponent},
  { path: 'books/manage', component: ManageBooksComponent, pathMatch: 'full'},
  { path : 'books/add', component: AddBookComponent, pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
