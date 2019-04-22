import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

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


  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) { }

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
        console.log(user)
        console.log(user[0])
        localStorage.setItem("username", user[0].username);
        localStorage.setItem("password", user[0].password);
        localStorage.setItem("email", user[0].email);
      });

    if(this.user.password.valueOf() == localStorage.getItem("password").valueOf()){
      this.router.navigateByUrl("day");
    }
  }
}
