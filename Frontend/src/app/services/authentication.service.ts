import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

  private baseUri: string;
  authenticationSubject: BehaviorSubject<boolean>;
  constructor(private httpClient: HttpClient) {
    this.baseUri = 'http://localhost:8089/api/v1/auth/';
    this.authenticationSubject = new BehaviorSubject(false);
  }

  register(user) {
    return this.httpClient.post(this.baseUri + 'register', user);
  }

  authenticateUser(user) {
    return this.httpClient.post(this.baseUri + 'login', user);
  }

  setBearerToken(token, userId) {
    localStorage.setItem('bearerToken', token);
    localStorage.setItem('userId', userId);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  getAuthentication() {
    return this.authenticationSubject;
  }

  isUserAuthenticated(token): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseUri + 'isAuthenticated', '', {
        headers: {
          'Authorization': 'Bearer ' + this.getBearerToken()
        }
      }).subscribe(res => {
        resolve(res['isAuthenticated']);
      },
        err => {
          reject(err);
        });
    });
  }
}
