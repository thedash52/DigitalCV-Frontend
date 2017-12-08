import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { Message } from "primeng/primeng";

import { UserService } from "../shared/index";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public userService: UserService, public location: Location) { }

  busy: Promise<any>;
  msg: Message[] = [];

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.busy = this.userService.login(username, password).then(result => this.handleLoginResult(result), err => {
      if (err.status === 401) {
        this.msg = [];
        this.msg.push({ severity: 'error', summary: 'Incorrect Login', detail: 'Username and Password are incorrect.' })
      }
    }).then(route => {
      if (route) {
        this.router.navigate([route]);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  handleLoginResult(result) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('currentUser', JSON.stringify(result.token));

      var loginRoute;

      if (this.userService.loginRoute || this.userService.loginRoute != "") {
        switch (this.userService.loginRoute) {
          case 'return':
            this.msg = [];
            this.msg.push({ severity: 'success', summary: 'Login Successful', detail: 'Loading...' });

            setTimeout(() => {
              this.location.back();
              this.userService.loginRoute = "";
            }, 2000);
            return;
          case 'edit':
            loginRoute = '/edit/basic';
            this.userService.loginRoute = "";
            break;
          case 'home':
            loginRoute = '';
            this.userService.loginRoute = "";
            break;
          default:
            loginRoute = this.userService.loginRoute;
            this.userService.loginRoute = "";
            break;
        }
      } else {
        loginRoute = '';
      }

      this.msg = [];
      this.msg.push({ severity: 'success', summary: 'Login Successful', detail: 'Loading...' });

      setTimeout(() => {
        return resolve(loginRoute);
      }, 2000);
    });
  }

  cancel() {
    this.userService.loginRoute = "";

    this.location.back();
  }
}
