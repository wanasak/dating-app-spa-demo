import { AuthHttp } from 'angular2-jwt';
import { SharedService } from './shared.service';
import { User } from './../models/User';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private authHttp: AuthHttp, private sharedService: SharedService) {}

  getUsers(): Observable<User[]> {
    return this.authHttp
      .get(this.baseUrl + 'users')
      .map(res => <User[]>res.json())
      .catch(this.sharedService.handlerError);
  }

  getUser(id: number): Observable<User> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id)
      .map(res => <User>res.json())
      .catch(this.sharedService.handlerError);
  }

  updateUser(user: User, id: number) {
    return this.authHttp
      .put(this.baseUrl + 'users/' + id, user)
      .catch(this.sharedService.handlerError);
  }
}
