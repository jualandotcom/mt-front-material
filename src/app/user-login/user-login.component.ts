import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { AuthGenerateRequest } from '../services/auth/authgeneraterequest';
import { AuthGenerateResponse } from '../services/auth/authgenerateresponse';
import { Router } from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  authGenerateRequest: AuthGenerateRequest = new AuthGenerateRequest();
  authGenerateResponse: AuthGenerateResponse = new AuthGenerateResponse();

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  test() {
    console.log(this.authGenerateResponse);
  }

  login(email: string, password: string) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.authGenerateRequest.requestId = this.randomString(10);
    this.authGenerateRequest.requestDate = localISOTime + '000';
    this.authGenerateRequest.tbaEmail = email;
    this.authGenerateRequest.tbaPassword = password;

    this.authService.postGenerate(this.authGenerateRequest)
      .subscribe(
        data => {
          this.authGenerateResponse = data;
          this.setSession(data);

          console.log(data);

          this.authGenerateResponse = data;
          // this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
  }

  randomString(length: number): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  private setSession(authGenerateResponse: AuthGenerateResponse) {
    localStorage.setItem('token', authGenerateResponse.token);
    localStorage.setItem('exp', authGenerateResponse.claims.exp.toString());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
  }

  public isLoggedIn() {
    console.log(moment().isBefore(this.getExpiration()));
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    return moment.unix(Number(localStorage.getItem('exp')));
  }

}
