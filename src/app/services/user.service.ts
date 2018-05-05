import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from './../models/message';
import { PaginatedResult } from './../models/pagination';
import { User } from './../models/User';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private authHttp: HttpClient
  ) {}

  getUsers(
    page?: number,
    itemsPerPage?: number,
    userParams?: any,
    likesParam?: any
  ): Observable<PaginatedResult<User[]>> {
    const paginationResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (likesParam === 'likers') {
      params = params.append('likers', 'true');
    }

    if (likesParam === 'likees') {
      params = params.append('likees', 'true');
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.authHttp
      .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
      .map(res => {
        paginationResult.result = res.body;

        if (res.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(
            res.headers.get('Pagination')
          );
        }

        return paginationResult;
      });
  }

  getUser(id: number) {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id);
  }

  updateUser(user: User, id: number) {
    return this.authHttp
      .put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(id: number, userId: number) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  sendLike(id: number, recipientId: number) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }

  deletePhoto(id: number, userId: number) {
    return this.authHttp
      .delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  getMessages(
    id: number,
    page?: number,
    itemsPerPage?: number,
    messageContainer?: string
  ): Observable<PaginatedResult<Message[]>> {
    const paginationResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();
    let params = new HttpParams();
    params = params.append('messageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.authHttp
      .get<Message[]>(this.baseUrl + 'users/' + id + '/messages', { observe: 'response', params })
      .map(res => {
        paginationResult.result = res.body;

        if (res.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(
            res.headers.get('Pagination')
          );
        }

        return paginationResult;
      });
  }

  getMessageThread(id: number, recipientId: number) {
    return this.authHttp
      .get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: Message) {
    return this.authHttp
      .post<Message>(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/messages/' + id, {})
      .map(res => {});
  }

  markAsRead(userId: number, messageId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {}).subscribe();
  }
}
