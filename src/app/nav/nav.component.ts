import { AlertifyService } from './../services/alertify.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertifyService: AlertifyService, private router: Router) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(
      data => {
        this.alertifyService.success('Login succesfully');
      },
      err => {
        this.alertifyService.error(err);
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
