import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  isShow: boolean;
  loginForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private service: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [this.user.username],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  onLoginSubmit() {
    
    let currentUser = new UserModel();
    this.service.getUser(this.user.username)
      .subscribe(user => {
        let currentUser = new UserModel();
        currentUser = user;
        localStorage.setItem("username", user.username);
        localStorage.setItem("password", user.password);
        localStorage.setItem("email", user.email);
        console.log(currentUser)
      });

    console.log(this.user.password.valueOf());
    console.log(localStorage.getItem("password"));

    if(this.user.password.valueOf() == localStorage.getItem("password").valueOf())
      alert(this.user.password + ' ' + this.user.password);
  }

}
