import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router';
import {ShareInfoService} from '../services/ShareInfoService'
import {ShareInfoClass} from '../models/ShareInfoClass'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  loggedIn: boolean
  constructor(private router:Router, private shareInfoService: ShareInfoService) {
    if (sessionStorage.getItem('user') === null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true; 
    }
   }

  ngOnInit(): void {
        // Get the username from shareinfoService
        this.shareInfoService.change.subscribe(value => {

          this.loggedIn = value.loggedIn;
        });
  }

  logout() {
    
    //this.shareInfoClass.logIn = false;
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.loggedIn = false; 
    this.router.navigate(['/']);
    //this.status = 'Login';

  }

}
