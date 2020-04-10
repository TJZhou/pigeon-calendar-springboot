import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: UserModel = new UserModel();
  isShow: boolean;
  registerForm: FormGroup;
  passwordComfirm: string;
  isExist = false;
  public valid = true;

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) { }

  // Initialize the component
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [this.user.username],
      email: [this.user.email,
      ],
      password: [this.user.password,
      ],
      passwordComfirm: [this.passwordComfirm,
      ]

    });
  }

  // Function clicking on register
  onRegisterSubmit() {
    if (this.user.email === undefined || this.user.password === undefined || this.passwordComfirm === undefined
      || this.user.password.length < 6 || this.user.password != this.passwordComfirm) {
      this.valid = false;
    } else {
      this.service.addUser(this.user)
        .subscribe(user => {
            alert('Successfully created user.');
            this.router.navigateByUrl('login');
        },
        err => {
          console.log(err);
          alert(err.error.errors);
        });
    }
  }

  public isValid() {
    return this.valid;
  }
}
