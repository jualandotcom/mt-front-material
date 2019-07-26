import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AuthGenerateRequest } from '../services/auth/authgeneraterequest';
import { AuthGenerateResponse } from '../services/auth/authgenerateresponse';
import { Router } from '@angular/router';
import { Util } from '../util';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  util: Util = new Util();
  authGenerateRequest: AuthGenerateRequest = new AuthGenerateRequest();
  authGenerateResponse: AuthGenerateResponse = new AuthGenerateResponse();

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['/user-register']);
  }

  login() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.authGenerateRequest.requestId = this.util.randomString(10);
    this.authGenerateRequest.requestDate = localISOTime + '000';

    this.authService.postGenerate(this.authGenerateRequest)
      .subscribe(
        successResponse => {
          this.authGenerateResponse = successResponse;

          this.util.setSession(this.authGenerateResponse);

          this.router.navigate(['/dashboard']);
        },
        errorResponse => {
          let errorMessage = '';
          for (const error of errorResponse.error.errors) {
            errorMessage += error.defaultMessage + '<br>';
            console.log(error.defaultMessage);
          }
          this.util.showNotification('danger', 'top', 'center', errorMessage);
        }
      );
  }

}
