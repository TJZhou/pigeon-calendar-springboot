import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service'; 

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

  constructor(private auth:AuthService, private formBuilder: FormBuilder, private service: UserService, private router: Router) { }

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
      this.service.getToken(this.user)
        .subscribe(token => {
          this.auth.setToken(token.access_token);
          localStorage.setItem("username", this.user.username);
          localStorage.setItem("password", this.user.password);
          localStorage.setItem("email", this.user.email);
          this.router.navigateByUrl("day");
        }, 
        err => {
          console.log(err);
          alert(err.error.errors)
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
