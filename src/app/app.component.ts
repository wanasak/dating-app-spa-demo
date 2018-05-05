import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // jwtHelper: JwtHelper = new JwtHelper();
  title = 'app';

  constructor(private authService: AuthService, private jwtHelperService: JwtHelperService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
      if (user.photoUrl) {
        this.authService.changeMemberPhoto(user.photoUrl);
      }
    }
  }
}
