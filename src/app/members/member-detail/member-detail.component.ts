import { User } from './../../models/User';
import { AlertifyService } from './../../services/alertify.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.galleryImages = this.getImages();
    });

    this.route.queryParams.subscribe(params => {
      this.memberTabs.tabs[params['tab']].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        preview: false,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];
  }

  getImages() {
    console.log(this.user);
    const imageUrls: NgxGalleryImage[] = [];
    for (let index = 0; index < this.user.photos.length; index++) {
      const photo = this.user.photos[index];
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }

    return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  // loadUser() {
  //   this.userService.getUser(this.route.snapshot.params['id']).subscribe(
  //     (user: User) => (this.user = user),
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
