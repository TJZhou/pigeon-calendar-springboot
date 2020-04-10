import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private route: Router) {}

  public invalidate() {
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigateByUrl('login');
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('access_token');
    return token != null && token != undefined;
  }
  public getToken(): string {
    if(sessionStorage.getItem("access_token") == null || sessionStorage.getItem("access_token") == undefined)
        return '';
    else return sessionStorage.getItem("access_token");
  }

  public setToken(access_token:string){
    sessionStorage.setItem("access_token", access_token)
  }
}