import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  user: UserModel = new UserModel();
  registerForm: FormGroup;
  hidden = true;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [this.user.username, [
        Validators.required
      ]],
      email: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      phone: [this.user.phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]]
    });
  }

  onRegisterSubmit() {
    alert(this.user.username + ' ' + this.user.email + ' ' + this.user.password + this.user.phone);
  }

}
