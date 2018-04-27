import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PreventUnsaveGuard implements CanDeactivate<MemberEditComponent> {
  // tslint:disable-next-line:max-line-length
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
      return confirm('Are you sure you want to leave? Any unsaved chages will be lost.');
    }
    return true;
  }
}
