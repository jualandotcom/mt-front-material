import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8081/user';

  constructor(private httpClient: HttpClient) { }

  // public getTest() {
  //   return this.httpClient.get(`${this.apiUrl}/test`);
  // }
  getTest() {
    return this.httpClient.get(`${this.apiUrl}/test`);
  }
}
