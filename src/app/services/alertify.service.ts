import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable()
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallbak: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallbak();
      } else {
      }
    });
  }

  success(message: string) {
      alertify.success(message);
  }

  error(message: string) {
      alertify.error(message);
  }

  warning(message: string) {
      alertify.warning(message);
  }

  message(message: string) {
      alertify.message(message);
  }
}
