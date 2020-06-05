import { Component, OnInit } from '@angular/core';
import {UsersService} from 'src/app/services/users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string; 

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    // check if laready signed in 
    var email = localStorage.getItem("user");
    if (email){
      this.router.navigate(['/home']);
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
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.result[0].id)
          localStorage.setItem('user',this.email);
          sessionStorage.setItem('user', this.email);
          

          this.router.navigate(['/home']);
          //this.Authentication = true;

        } else {
          alert('Invalid password');
        }
      }
    );
  }
}
