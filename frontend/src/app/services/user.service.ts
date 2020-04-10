import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Token } from '../models/token.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Set the url of user
  private userUrl: string = environment.apiUrl + '/user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.userUrl);
  }

  getToken(user: UserModel): Observable<Token> {
    return this.http.post<Token>(this.userUrl + '/token', user);
  }

  getUser(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.userUrl + username);
  }

  addUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.userUrl, user);
  }

  updateUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(this.userUrl + user.username, user)
  }

  deleteUser(username: string): Observable<UserModel> {
    return this.http.delete<UserModel>(this.userUrl + username);
  }
}
