import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserConfirmationRequest } from '../services/user/userconfirmationrequest';
import { UserConfirmationResponse } from '../services/user/userconfirmationresponse';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Util } from '../util';

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  util: Util = new Util();
  message: string;
  userConfirmationRequest: UserConfirmationRequest = new UserConfirmationRequest();
  userConfirmationResponse: UserConfirmationResponse = new UserConfirmationResponse();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    let uuid: string;
    this.route.queryParams.forEach((params: Params) => {
      uuid = params['uuid'];
    });

    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.userConfirmationRequest.requestId = this.util.randomString(10);
    this.userConfirmationRequest.requestDate = localISOTime + '000';
    this.userConfirmationRequest.tbuUid = uuid;

    this.userService.postConfirmation(this.userConfirmationRequest).subscribe(
      successConfirmationResponse => {
        this.userConfirmationResponse = successConfirmationResponse;

        this.message = this.userConfirmationResponse.message;

        this.util.showNotification('info', 'top', 'center', this.userConfirmationResponse.message);
      },
      errorResponse => {
        this.message = errorResponse.error.error;

        this.util.showNotification('danger', 'top', 'center', errorResponse.error.error);
      }
    );
  }

  login() {
    this.router.navigate(['/user-login']);
  }

}
