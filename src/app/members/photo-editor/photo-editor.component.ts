import { AlertifyService } from './../../services/alertify.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import * as _ from 'underscore';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[] = [];
  @Output() memberPhotoChanged = new EventEmitter<string>();
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'users/' +
        this.authService.decodedToken.nameid +
        '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currentUser)
          );
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(photo.id, this.authService.decodedToken.nameid)
      .subscribe(
        () => {
          const currentMainPhoto = _.findWhere(this.photos, { isMain: true });
          currentMainPhoto.isMain = false;
          photo.isMain = true;
          // this.memberPhotoChanged.emit(photo.url);
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currentUser)
          );
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  deletePhoto(photo: Photo) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService
        .deletePhoto(photo.id, this.authService.decodedToken.nameid)
        .subscribe(() => {
          this.photos.splice(_.findIndex(this.photos, { id: photo.id }), 1);
          this.alertify.success('Photo has been deleted');
        }, error => {
          this.alertify.error('Failed to delete photo');
        });
    });
  }
}
