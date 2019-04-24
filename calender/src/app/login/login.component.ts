import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { UserService } from '../services/user.service'
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  isShow: boolean;
  loginForm: FormGroup;
  public valid1 = true;
  public valid2 = true;

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [this.user.username],
      password: [this.user.password,
      //    [
      //   // Validators.required,
      //   // Validators.minLength(6),
      //   // Validators.maxLength(30)
      // ]
    ]
    });
  }

  onLoginSubmit() {

    if (this.user.username === undefined || this.user.password === undefined || this.user.password.length < 6 ) {
      this.valid2 = false;
      this.valid1 = true;
    } else {
      let currentUser = new UserModel();
      this.service.getUser(this.user.username)
        .subscribe(user => {
          // console.log(user)
          // console.log(user[0])
          localStorage.setItem("username", user[0].username);
          localStorage.setItem("password", user[0].password);
          localStorage.setItem("email", user[0].email);
          if(this.user.password === user[0].password){
            this.router.navigateByUrl("day");
            this.valid1 = true;
            this.valid2 = true;
          } else {
            this.valid1 = false;
            this.valid2 = true;
          }
        });
    }
  }

  isValid1() {
    return this.valid1;
  }
  isValid2() {
    return this.valid2;
  }
}
