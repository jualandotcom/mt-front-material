import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/auth/auth.service';
import { AuthGenerateRequest } from '../services/auth/authgeneraterequest';
import { AuthGenerateResponse } from '../services/auth/authgenerateresponse';
import { Router } from '@angular/router';

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

  login(email: string, password: string) {
    this.authGenerateRequest.requestId = '1234567890';
    this.authGenerateRequest.requestDate = '2019-06-14T13:34:34.752634';
    this.authGenerateRequest.tbaEmail = email;
    this.authGenerateRequest.tbaPassword = password;

    this.authService.postGenerate(this.authGenerateRequest)
      .subscribe(
        data => {
          console.log(data);

          this.authGenerateResponse = data;
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
  }

}
