import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { LocalDataService } from '../services/local-data.service';
import { User } from '../common/interferce/commonDataFormat';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  userName = '';
  password = '';
  checkPassword = '';

  constructor(public localdataService: LocalDataService,
              public router: Router,
              private message: NzMessageService) {
  }

  ngOnInit() {

  }

  checkPasswordIsEqual() {
    return (this.checkPassword !== '') && (this.checkPassword !== this.password);
  }

  public checkUserName(): boolean {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return this.userName !== '' && (this.userName.length <= 6 || !EMAIL_REGEXP.test(this.userName));
  }

  registerUser() {
    const user: User = {
      userName: this.userName,
      password: this.password
    };
    const result: number = this.localdataService.addUser(user);
    if (result === LocalDataService.RESULT_CODE.SUCCESS) {
      this.message.create('success', `Register successfully!`);
      this.router.navigateByUrl('Login');
    } else {
      this.message.create('error', `Failed. This username has been registered!`);
    }
  }

}
