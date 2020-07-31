import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  requestUrl:string = "https://" + window.location.hostname + ":3301";
  //requestUrl:string='http://localhost:3301';

  constructor(private http:HttpClient) { }


  addToCart(bookId: string, quantity: number){
    const userId = localStorage.getItem('userId').toString();
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

   return this.http.post(this.requestUrl+'/cart/'+ userId,{
    bookId, quantity
   },httpOptions);
  }

  getCart(){
    const userId = localStorage.getItem('userId').toString();
    return this.http.get(this.requestUrl+ "/cart/"+userId)   
  }

  deleteFromCart(itemId: string){
    const userId = localStorage.getItem('userId').toString();
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      }),
      body: {
        id: itemId
      }
    };

    return this .http.delete(this.requestUrl + "/cart/"+userId, httpOptions)

  }

  updateCart(itemId: string, bookId: string, newQuantity: number){
    const userId = localStorage.getItem('userId').toString();
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

   return this.http.put(this.requestUrl+'/cart/'+ userId,{
    bookId, newQuantity, id:itemId
   },httpOptions);
  }


  getDeletedItems() {
    const userId = localStorage.getItem('userId').toString();
    return this.http.get(this.requestUrl+"/bufferCart/"+ userId);
  }

}
