import { Message } from './../models/message';
import { AlertifyService } from './../services/alertify.service';
import { UserService } from './../services/user.service';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<{} | Message[]> {
  pageSize = 5;
  pageNumber = 1;
  messageContainer = 'unread';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<{} | Message[]> {
    return this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      )
      .catch(err => {
        this.alertify.error(err);
        this.router.navigate(['/home']);
        return Observable.of(null);
      });
  }
}
