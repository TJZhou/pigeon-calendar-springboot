import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Set the url of user
  private userUrl: string = 'http://13.58.225.69:8080/user/';

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

  updateUser(user: UserModel): Observable<UserModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log(this.userUrl + user.username)
    return this.http.put<UserModel>(this.userUrl + user.username, user, httpOptions)
  }

  deleteUser(username: string): Observable<UserModel> {
    return this.http.delete<UserModel>(this.userUrl + username);
  }
}
