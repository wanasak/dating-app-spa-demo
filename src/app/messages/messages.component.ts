import { AlertifyService } from './../services/alertify.service';
import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from './../models/pagination';
import { Message } from './../models/message';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  messageContainer = 'unread';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure to delete this message?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid)
        .subscribe(() => {
          this.messages.splice(_.findIndex(this.messages, { id: id }), 1);
          this.alertify.success('Message has been deleted');
        }, err => {
          this.alertify.error('Failed to delete this message');
        });
    });
  }
}
