import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {SharedService} from './shared.service.client';

// injecting service into module
@Injectable()

export class UserService {

  constructor(private sharedService: SharedService, private http: Http, private router: Router) {
  }
  options: RequestOptions = new RequestOptions;

  baseUrl = environment.baseUrl;

  // api = {
  //   'createUser'   : this.createUser,
  //   'findUserById' : this.findUserById,
  //   'findUserByUsername' : this.findUserByUsername,
  //   'updateUser' : this.updateUser,
  //   'deleteUser' : this.deleteUser,
  //   'findUserByCredentials' : this.findUserByCredentials
  // };

  loggedIn() {
    console.log('hello from user client logged in');
    const url = this.baseUrl + '/api/loggedIn';
    this.options.withCredentials = true;
    console.log(this.options.withCredentials);
    return this.http.post(url, '', this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user;
          return true;
        } else {
          this.router.navigate(['/landing']);
          return false;
        }
      });
  }


  logout() {
    const url = this.baseUrl + '/api/logout';
    this.options.withCredentials = true;
    return this.http.post(url, { }, this.options)
      .map((response: Response) => {
        return response;
      });
  }

  register(username, password) {
    const url = this.baseUrl + '/api/register';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  login(username, password) {
    const url = this.baseUrl + '/api/login';
    const credentials = {
      username: username,
      password: password
    };
    this.options.withCredentials = true;
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }


  createUser(user: any) {
    this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/user/', user)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findUserById(userId: String) {
    return this.http.get(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findUserByUsername(username: String) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateUser(userId: String, user: any) {
    return this.http.put(this.baseUrl + '/api/user/' + userId, user)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  deleteUser(userId: String) {
    return this.http.delete(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findUserByCredentials(username: String, password: String) {
    console.log('hits client service?');
    return this.http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

}
