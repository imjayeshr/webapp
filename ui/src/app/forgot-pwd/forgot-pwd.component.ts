import { Component, OnInit } from '@angular/core';
import {UsersService} from 'src/app/services/users.service'

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.scss']
})
export class ForgotPwdComponent implements OnInit {

  email: string;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  ForgotPassword(){
    if (this.email === '') {
      alert('Please enter an email');
      return;
    }

    this.userService.Forgot(this.email).subscribe(response=>{
      console.log(response);
      alert("Password reset mail sent");
    })


  }

}