import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserAddRequest } from '../services/user/useraddrequest';
import { UserAddResponse } from '../services/user/useraddresponse';
import { Router } from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  userAddRequest: UserAddRequest = new UserAddRequest();
  userAddResponse: UserAddResponse = new UserAddResponse();

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    console.log(this.userAddRequest);
  }

  login() {
    this.router.navigate(['/user-login']);
  }

  // login(email: string, password: string) {
  //   let tzoffset = (new Date()).getTimezoneOffset() * 60000;
  //   let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  //   this.authGenerateRequest.requestId = this.randomString(10);
  //   this.authGenerateRequest.requestDate = localISOTime + '000';
  //   this.authGenerateRequest.tbaEmail = email;
  //   this.authGenerateRequest.tbaPassword = password;

  //   this.authService.postGenerate(this.authGenerateRequest)
  //     .subscribe(
  //       data => {
  //         this.authGenerateResponse = data;
  //         this.setSession(data);

  //         console.log(data);

  //         this.authGenerateResponse = data;
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  // private randomString(length: number): string {
  //   let outString: string = '';
  //   let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

  //   for (let i = 0; i < length; i++) {
  //     outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  //   }

  //   return outString;
  // }

  // private setSession(authGenerateResponse: AuthGenerateResponse) {
  //   localStorage.setItem('token', authGenerateResponse.token);
  //   localStorage.setItem('exp', authGenerateResponse.claims.exp.toString());
  // }

  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('exp');
  // }

  // isLoggedIn() {
  //   let day = moment.unix(Number(localStorage.getItem('exp')));
  //   return moment().isBefore(day);
  // }

}
