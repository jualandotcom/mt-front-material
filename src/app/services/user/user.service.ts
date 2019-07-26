import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAddRequest } from './useraddrequest';
import { UserAddResponse } from './useraddresponse';
import { UserNotifyRequest } from './usernotifyrequest';
import { UserNotifyResponse } from './usernotifyresponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8081/user';

  constructor(private httpClient: HttpClient) { }

  postAdd(userAddRequest: UserAddRequest): Observable<UserAddResponse> {
    return this.httpClient.post<UserAddResponse>(`${this.apiUrl}/add`, userAddRequest);
  }

  postNotify(userNotifyRequest: UserNotifyRequest): Observable<UserNotifyResponse> {
    return this.httpClient.post<UserNotifyResponse>(`${this.apiUrl}/notify`, userNotifyRequest);
  }
}
