import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AuthGenerateRequest } from '../services/auth/authgeneraterequest';
import { AuthGenerateResponse } from '../services/auth/authgenerateresponse';
import { Router } from '@angular/router';
import * as moment from "moment";

declare let $: any;
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
    private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['/user-register']);
  }

  login() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.authGenerateRequest.requestId = this.randomString(10);
    this.authGenerateRequest.requestDate = localISOTime + '000';

    this.authService.postGenerate(this.authGenerateRequest)
      .subscribe(
        success => {
          console.log(success);

          this.authGenerateResponse = success;
          this.setSession(success);

          this.authGenerateResponse = success;
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.showNotification('top','center',error.error.error);
        }
      );
  }

  private randomString(length: number): string {
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

  isLoggedIn() {
    let day = moment.unix(Number(localStorage.getItem('exp')));
    return moment().isBefore(day);
  }

  showNotification(from, align, message){
    const type = ['','info','success','warning','danger'];

    const color = 4;

    $.notify({
        icon: "notifications",
        message: message

    },{
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

}
