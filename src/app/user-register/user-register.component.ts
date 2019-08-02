import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserAddRequest } from '../services/user/useraddrequest';
import { UserAddResponse } from '../services/user/useraddresponse';
import { UserNotifyRequest } from '../services/user/usernotifyrequest';
import { UserNotifyResponse } from '../services/user/usernotifyresponse';
import { Router } from '@angular/router';
import { Util } from '../util';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  util: Util = new Util();
  userAddRequest: UserAddRequest = new UserAddRequest();
  userAddResponse: UserAddResponse = new UserAddResponse();

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    // this.userAddRequest.tbuFirstname = 'Achmad';
    // this.userAddRequest.tbuLastname = 'Amri';
    // this.userAddRequest.tbuMobilePhone = '08158800230';
    // this.userAddRequest.tbuPlaceOfBirth = 'Palembang';
    // this.userAddRequest.tbuDateOfBirth = '1981-08-19';
    // this.userAddRequest.tbuEmail = 'jualan.com.2010@gmail.com';
    // this.userAddRequest.tbuPassword = 'P@55w0rd';
    // this.userAddRequest.tbuConfirmPassword = 'P@55w0rd';
  }

  register() {
    Object.keys(this.userAddRequest).forEach(k => this.userAddRequest[k] = this.userAddRequest[k] === '' ? null : this.userAddRequest[k]);

    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.userAddRequest.requestId = this.util.randomString(10);
    this.userAddRequest.requestDate = localISOTime + '000';

    this.userService.postAdd(this.userAddRequest)
      .subscribe(
        successResponse => {
          this.userAddResponse = successResponse;

          if (this.userAddResponse.status === '200') {
            this.util.showNotification('info', 'top', 'center', this.userAddResponse.message);
          } else {
            this.util.showNotification('warning', 'top', 'center', this.userAddResponse.message);
          }

          const userNotifyRequest = new UserNotifyRequest();
          let userNotifyResponse = new UserNotifyResponse();

          localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

          userNotifyRequest.tbuUid = this.userAddResponse.tbUsers.tbuUid;
          userNotifyRequest.requestId = this.util.randomString(10);
          userNotifyRequest.requestDate = localISOTime + '000';

          this.userService.postNotify(userNotifyRequest).subscribe(
            successNotifyResponse => {
              userNotifyResponse = successNotifyResponse;

              this.util.showNotification('info', 'top', 'center', userNotifyResponse.message);
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

  login() {
    this.router.navigate(['/user-login']);
  }

}
