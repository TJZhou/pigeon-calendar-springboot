import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Set the url of user
  private userUrl: string = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.userUrl);
  }

  getUser(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.userUrl + username);
  }

  addUser(user: UserModel): Observable<UserModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<UserModel>(this.userUrl, user, httpOptions);
  }

  deleteUser(username: string): Observable<UserModel> {
    return this.http.delete<UserModel>(this.userUrl + username);
  }
}
