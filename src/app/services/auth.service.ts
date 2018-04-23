import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

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
      });
  }

  register(model: any) {
    return this.http.post(
      this.baseUrl + 'register',
      model,
      this.requestOptions()
    );
  }

  private requestOptions() {
    const headers = new Headers({
      'Content-type': 'application/json'
    });
    return new RequestOptions({ headers: headers });
  }
}
