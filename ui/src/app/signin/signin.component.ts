import { Component, OnInit } from '@angular/core';
import {UsersService} from 'src/app/services/users.service'
import { Router } from '@angular/router';
import {ShareInfoClass} from '../models/ShareInfoClass'
import {ShareInfoService} from '../services/ShareInfoService'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string; 
  shareInfoClass: ShareInfoClass = new ShareInfoClass;

  constructor(private userService: UsersService, private router: Router, private shareInfoService: ShareInfoService) { }

  ngOnInit(): void {
    // check if laready signed in 
    var email = localStorage.getItem("user");
    if (email){
      this.router.navigate(['/books']);
    }
  }

  UserLogin(){
    if (this.email === '') {
      alert('please input email');
      return;
    } else if (this.password === '') {
      alert('please input password');
      return;
    }
    
    this.userService.SignIn(this.email, this.password).subscribe(response => {

        console.log(response);
        if (response.result === 'Unauthorized') {
          alert('Invalid password');
        } else if (response !== null) {
          //share username and log in status
          // When running app.js use the below code

          //when running server.js, uncomment the below line
          //this.user = response.user;

          console.log(this.email + "logged in ");
          console.log(response.result);
          
          this.shareInfoClass.loggedIn = true;
          this.shareInfoService.change.emit(this.shareInfoClass);

          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id)
          //localStorage.setItem('userId', response.result[0].id)
          localStorage.setItem('user',this.email);
          sessionStorage.setItem('user', this.email);
          

          this.router.navigate(['/books']);
          //this.Authentication = true;

        } else {
          alert('Invalid password');
        }
      }
    );
  }
}
