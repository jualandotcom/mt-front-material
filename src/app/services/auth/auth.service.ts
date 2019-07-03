import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthCheckRequest } from './authcheckrequest';
import { AuthCheckResponse } from './authcheckresponse';
import { AuthGenerateRequest } from './authgeneraterequest';
import { AuthGenerateResponse } from './authgenerateresponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8082/auth';

  constructor(private httpClient: HttpClient) { }

  postCheck(authCheckRequest: AuthCheckRequest): Observable<AuthCheckResponse> {
    return this.httpClient.post<AuthCheckResponse>(`${this.apiUrl}/check`, authCheckRequest);
  }

  postGenerate(authGenerateRequest: AuthGenerateRequest): Observable<AuthGenerateResponse> {
    return this.httpClient.post<AuthGenerateResponse>(`${this.apiUrl}/generate`, authGenerateRequest);
  }
}
