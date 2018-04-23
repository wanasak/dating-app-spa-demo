import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  userToken: any;
  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: Http) {}

  login(model: any) {
    return this.http
      .post(this.baseUrl + 'login', model, this.requestOptions())
      .map((res: Response) => {
        const user = res.json();
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.userToken = user.tokenString;
        }
      })
      .catch(this.handlerError);
  }

  register(model: any) {
    return this.http
      .post(this.baseUrl + 'register', model, this.requestOptions())
      .catch(this.handlerError);
  }

  private requestOptions() {
    const headers = new Headers({
      'Content-type': 'application/json'
    });
    return new RequestOptions({ headers: headers });
  }

  private handlerError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.json();
    let modelStateError = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateError += serverError[key] + '\n';
        }
      }
    }

    return Observable.throw(modelStateError || 'Server Error');
  }
}
