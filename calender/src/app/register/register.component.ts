import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { Router} from '@angular/router';
import { UserService } from '../services/user.service'

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
  isExist: boolean = false;


  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [this.user.username],
      email:[this.user.email, [
          Validators.required,
          Validators.email
        ]
      ],
      password: [this.user.password, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      passwordComfirm: [this.passwordComfirm, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ]

    });
  }

  onRegisterSubmit() {
    this.service.getUser(this.user.username)
      .subscribe( user => { 
        if(user[0] != null && user[0].username === this.user.username)
          alert("This username is registered!")
        else{
          if(this.user.password.valueOf() == this.passwordComfirm.valueOf()){ 
            alert("Created new user successfully!")
            this.service.addUser(this.user)
              .subscribe();
            this.router.navigateByUrl("login");
          }else alert("Passwords must match!")
        }
      })
    
  }

}
