import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {
  constructor() {}

  public handlerError(error: any) {
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

  // public getJWT() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const headers = new Headers({ Authorization: 'Bearer ' + token });
  //     headers.append('Content-type', 'application/json');
  //     return new RequestOptions({ headers: headers });
  //   }
  // }
}
