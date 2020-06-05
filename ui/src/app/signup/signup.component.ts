import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {UsersService} from 'src/app/services/users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  firstname: string;
  lastname: string;
  password: string;
  rePassword: string; 

  pattern:any=/^[0-9A-Za-z]+(\.[a-zA-Z0-9_-]+)*@[0-9A-Za-z_]+(\.[a-zA-Z0-9_-]+)+$/g;

  constructor(private router:Router, private userService:UsersService) { }

  ngOnInit(): void {
     // check if laready signed in 
     var email = localStorage.getItem("user");
     if (email){

       this.router.navigate(['/home']);
     }
  }


  register(){
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    
    if(this.email == null){
      alert("Email not entered");
    }
    else if(!this.email.match(this.pattern)){
      alert("Please enter valid email id");
    }
    else if(this.firstname == null){
      alert("don't leave firstname  blank");
    }
    else if(this.password != null && this.password == this.rePassword && this.rePassword!=null){

      if(!this.password.match(passw)) 
    { 
      alert('Weak password, try another...')
      return true;
    }

      console.log("passwords match"); 
      // If the passwords match send a post request to the back end 
      this.userService.SignUp(this.email, this.firstname, this.lastname, this.password).subscribe((res)=>
      {
        console.log("Received from the back end ", res);
        if(res.status == 400){
          alert("Email already exists!")
        }
        else {
          alert("Account created. You can sign in now");
          this.router.navigate(['/signin']);
        }
      });
      
      
    }
    else{
      alert("Invalid input");
    }
  }

}
