import { Message } from "./../models/message";
import { PaginatedResult } from "./../models/pagination";
import { AuthHttp } from "angular2-jwt";
import { SharedService } from "./shared.service";
import { User } from "./../models/User";
import { Observable } from "rxjs/Observable";
import { environment } from "./../../environments/environment";
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private authHttp: AuthHttp,
    private sharedService: SharedService
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
    let queryString = "?";

    if (page != null && itemsPerPage != null) {
      queryString += `pageNumber=${page}&pageSize=${itemsPerPage}&`;
    }

    if (likesParam === "likers") {
      queryString += "likers=true&";
    }

    if (likesParam === "likees") {
      queryString += "likees=true&";
    }

    if (userParams != null) {
      queryString +=
        "minAge=" +
        userParams.minAge +
        "&maxAge=" +
        userParams.maxAge +
        "&gender=" +
        userParams.gender +
        "&orderBy=" +
        userParams.orderBy;
    }

    return this.authHttp
      .get(this.baseUrl + "users" + queryString)
      .map(res => {
        paginationResult.result = res.json();

        if (res.headers.get("Pagination") != null) {
          paginationResult.pagination = JSON.parse(
            res.headers.get('Pagination')
          );
        }

        return paginationResult;
      })
      .catch(this.sharedService.handlerError);
  }

  getUser(id: number): Observable<User> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id)
      .map(res => <User>res.json())
      .catch(this.sharedService.handlerError);
  }

  updateUser(user: User, id: number) {
    return this.authHttp
      .put(this.baseUrl + 'users/' + id, user)
      .catch(this.sharedService.handlerError);
  }

  setMainPhoto(id: number, userId: number) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {})
      .catch(this.sharedService.handlerError);
  }

  sendLike(id: number, recipientId: number) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {})
      .catch(this.sharedService.handlerError);
  }

  deletePhoto(id: number, userId: number) {
    return this.authHttp
      .delete(this.baseUrl + 'users/' + userId + '/photos/' + id)
      .catch(this.sharedService.handlerError);
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
    let queryString = '?messageContainer=' + messageContainer;

    if (page != null && itemsPerPage != null) {
      queryString += '&pageNumber=' + page + '&pageSize=' + itemsPerPage;
    }

    return this.authHttp
      .get(this.baseUrl + 'users/' + id + '/messages' + queryString)
      .map(res => {
        paginationResult.result = res.json();

        if (res.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(
            res.headers.get('Pagination')
          );
        }

        return paginationResult;
      })
      .catch(this.sharedService.handlerError);
  }

  getMessageThread(id: number, recipientId: number) {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.sharedService.handlerError);
  }

  sendMessage(id: number, message: Message) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + id + '/messages', message)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.sharedService.handlerError);
  }

  deleteMessage(id: number, userId: number) {
    return this.authHttp
      .post(this.baseUrl + 'users/' + userId + '/messages/' + id, {})
      .map(res => {})
      .catch(this.sharedService.handlerError);
  }

  markAsRead(userId: number, messageId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {}).subscribe();
  }
}
