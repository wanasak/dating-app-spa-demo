import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './../models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../models/authUser';

@Injectable()
export class AuthService {
  userToken: any;
  baseUrl = 'http://localhost:5000/api/auth/';
  decodedToken: any;
  currentUser: User;
  // jwtHelper: JwtHelper = new JwtHelper();
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http
      .post(this.baseUrl + 'login', model, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      .map((user: AuthUser) => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUser = user.user;
          this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
          if (this.currentUser.photoUrl) {
            this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        }
      });
  }

  register(user: User) {
    return this.http
      .post(this.baseUrl + 'register', user, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  loggedIn() {
    const token = this.jwtHelperService.tokenGetter();

    if (!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
  }

  // private requestOptions() {
  //   const headers = new Headers({
  //     'Content-type': 'application/json'
  //   });
  //   return new RequestOptions({ headers: headers });
  // }
}
