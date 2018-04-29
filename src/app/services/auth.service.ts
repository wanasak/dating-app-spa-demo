import { User } from './../models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  userToken: any;
  baseUrl = 'http://localhost:5000/api/auth/';
  decodedToken: any;
  currentUser: User;
  jwtHelper: JwtHelper = new JwtHelper();
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: Http, private sharedService: SharedService) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http
      .post(this.baseUrl + 'login', model, this.requestOptions())
      .map((res: Response) => {
        const user = res.json();
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUser = user.user;
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
          if (this.currentUser.photoUrl) {
            this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        }
      })
      .catch(this.sharedService.handlerError);
  }

  register(user: User) {
    return this.http
      .post(this.baseUrl + 'register', user, this.requestOptions())
      .catch(this.sharedService.handlerError);
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  private requestOptions() {
    const headers = new Headers({
      'Content-type': 'application/json'
    });
    return new RequestOptions({ headers: headers });
  }
}
