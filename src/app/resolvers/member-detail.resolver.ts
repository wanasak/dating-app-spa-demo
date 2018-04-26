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

@Injectable()
export class MemberDetailResolver implements Resolve<{} | User> {
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<{} | User> {
    return this.userService.getUser(route.params['id']).catch(err => {
      this.alertify.error(err);
      this.router.navigate(['/members']);
      return Observable.of(null);
    });
  }
}
