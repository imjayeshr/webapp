import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

// Stores User Login Account Details and setting up connection from backend
export class UsersService {

  requestUrl:string = "http://" + window.location.hostname + ":3301";
  //requestUrl:string='http://localhost:3301';

  constructor(private http:HttpClient){}


  SignIn(email:string,password:string):Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.requestUrl+'/users/signin',{
      email,
      password
    });
  }


  SignUp(email:string,firstname: string, lastname:string, password:string,):Observable<any>
  {
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
     })
   };

   const body = {
    email,firstname,lastname,password  
   }
   
   console.log("sending the request now with body ", body);
   return this.http.post(this.requestUrl+'/users/signup',body,httpOptions);
  }

  GetUserInfo(email:string) : Observable<any>{
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };
    return this.http.get(this.requestUrl + '/users/' + email, httpOptions);
  }

  UpdateInfo(email:string, firstname:string, lastname: string) {
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

    
    
    return this.http.put(this.requestUrl + '/users/settings/info', {
      firstname,
      lastname,
      email
    }, httpOptions);
  }

  UpdatePassword(email:string, oldpassword:string, newpassword: string) {
    const token = localStorage.getItem('token').toString();
    // Attach the JWT token to the request header
    const bearer = 'Bearer ' + token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': bearer
      })
    };

    
    
    return this.http.put(this.requestUrl + '/users/settings/password', {
      email,
      oldpassword,
      newpassword
    }, httpOptions);
  }

}
