import { Photo } from './../../models/Photo';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/User';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from '../../services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService
      .updateUser(this.user, this.authService.decodedToken.nameid)
      .subscribe(
        res => {
          this.alertify.success('Profile updated successfully');
          this.editForm.reset(this.user);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  memberPhotoChanged(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
