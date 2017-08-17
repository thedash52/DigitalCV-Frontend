import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

import { UserService } from "../shared/index";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private location: Location) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.userService.login(username, password).then(result => {
      localStorage.setItem('currentUser', JSON.stringify(result.token));

      var loginRoute;

      if (this.userService.loginRoute || this.userService.loginRoute != "") {
      loginRoute = this.userService.loginRoute;
      this.userService.loginRoute = "";
      } else {
        loginRoute = '/edit/basic';
      }

      this.router.navigate([loginRoute]);
    });
  }

  cancel() {
    this.userService.loginRoute = "";

    this.location.back();
  }
}
