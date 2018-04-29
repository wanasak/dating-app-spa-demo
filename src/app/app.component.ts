import { JwtHelper } from 'angular2-jwt';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jwtHelper: JwtHelper = new JwtHelper();
  title = 'app';

  constructor(private authService: AuthService) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      if (user.photoUrl) {
        this.authService.changeMemberPhoto(user.photoUrl);
      }
    }
  }
}
