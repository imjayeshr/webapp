import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  //requestUrl:string='http://localhost:3301';
  requestUrl:string = "http://" + window.location.hostname + ":3301";
  //requestUrl:string=process.env.BASE_URL;
  constructor(private http:HttpClient) { }


  addBook(formData: FormData):Observable<any>
  {
    const token = localStorage.getItem('token').toString();

    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

   return this.http.post(this.requestUrl+'/books', formData, httpOptions);
  }
/*
  addBook(isbn:string,title: string, authors:string, price:number, quantity:number):Observable<any>
  {
    const userId = localStorage.getItem('userId').toString();
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

   return this.http.post(this.requestUrl+'/books',{
    isbn, title, authors, price, quantity, userId
   },httpOptions);
  }
*/ 

  getBooks(): Observable<any>{
    return this.http.get(this.requestUrl + '/books')
  }

  deleteBook(bookId: string) : Observable<any>{
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };
    console.log("Book id is ", bookId);
    return this.http.delete(this.requestUrl + '/books/' + bookId, httpOptions);
  }

  // Get a specific book's record
  getSpecificBook(id:string) : Observable<any>{
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };
    return this.http.get(this.requestUrl + '/books/'+ id, httpOptions);
  }

  // To update a book

  updateBook(isbn:string,title: string, authors:string, price:number, quantity:number, id:string):Observable<any>
  {
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

   return this.http.put(this.requestUrl+'/books',{
    isbn, title, authors, price, quantity, bookId: id
   },httpOptions);
  }

  updateBooksImages(id, updatedImageString, imageUrl):Observable<any>{
        const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

    return this.http.put(this.requestUrl+'/images/update',{
      id, updatedImageString, imageUrl
     },httpOptions);
  }


  addImageToBook(formData: FormData):Observable<any>
  {
    const token = localStorage.getItem('token').toString();

    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

   return this.http.post(this.requestUrl+'/images/update', formData, httpOptions);
  }

}


