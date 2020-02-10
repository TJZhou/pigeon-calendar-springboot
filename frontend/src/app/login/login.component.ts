import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { UserService } from '../services/user.service';
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

  // Initialize the component
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [this.user.username],
      password: [this.user.password,
    ]
    });
  }

  // Function when clicking on login button
  onLoginSubmit() {

    if (this.user.username === undefined || this.user.password === undefined || this.user.password.length < 6 ) {
      this.valid2 = false;
      this.valid1 = true;
    } else {
      let currentUser = new UserModel();
      this.service.getUser(this.user.username)
        .subscribe(user => {
          if(user === null) {
            alert("invalid user");
            return;
          }
          localStorage.setItem("username", user.username);
          localStorage.setItem("password", user.password);
          localStorage.setItem("email", user.email);
          if(this.user.password === user.password){
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
