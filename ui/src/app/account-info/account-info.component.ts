import { Component, OnInit } from '@angular/core';
import {UsersService} from 'src/app/services/users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  firstname: string;
  lastname:string;
  email:string;
  oldpassword: string;
  newpassword: string;
  renewpassword: string;

  tempfname:string
  templname:string

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    var currentuser = localStorage.getItem("user");
    this.userService.GetUserInfo(currentuser).subscribe(response => {
      console.log(response);
      this.firstname = response[0].firstname;
      this.lastname = response[0].lastname;
      this.email = response[0].email;

      // Set the text fields 
      this.tempfname = this.firstname
      this.templname = this.lastname

    });

  }

  UpdateUserInfo(){
    if (this.tempfname === '') {
      alert('please input firstname');
      return;
    } else if (this.templname === '') {
      alert('please input lastname');
      return;
    }

    this.userService.UpdateInfo(this.email, this.tempfname, this.templname).subscribe(result => {
      console.log(result);
    })

  }

  UpdatePassword(){
    if (this.oldpassword === ''){
      alert('please input the password');
      return;
    }
    else if (this.newpassword === '') {
      
      alert('please input new password');
      return;
    }
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if(!this.newpassword.match(passw)) 
    { 
      alert('Weak password, try another...')
      return true;
    }

    console.log("sending", this.oldpassword, "    -------    ", this.newpassword)

    this.userService.UpdatePassword(this.email, this.oldpassword,this.newpassword).subscribe((res) =>{
      
      alert(res);
    })


  }

  logout() {
    
    //this.shareInfoClass.logIn = false;
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
    //this.status = 'Login';

  }

}
