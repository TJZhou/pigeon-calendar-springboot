import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service'
import { Router} from '@angular/router';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.scss']
})
export class EditEmailComponent implements OnInit {

	@Output() close = new EventEmitter<boolean>();
	emailEditForm: FormGroup;
  username = localStorage.getItem("username")
  password = localStorage.getItem("password")
	email: string;
	comfirmEmail: string;

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) { }

  ngOnInit() {
  	this.emailEditForm = this.formBuilder.group({
      email:[this.email, [
          Validators.required,
          Validators.email
        ]
      ],
      comfirmEmail: [this.comfirmEmail, [
          Validators.required,
          Validators.email
        ]
      ]

    });
  }

  closeEditEmail(){
    this.router.navigateByUrl("/day")
  }

  creatUser(): UserModel{
    let user = {
      "username": this.username,
      "password": this.password,
      "email": this.email
    }
    return user
  }

  onSubmit(){
    if(this.email === this.comfirmEmail){
      this.service.updateUser(this.creatUser())
        .subscribe(user => {
          localStorage.setItem("email", user.email)
          alert("Changed email successfully!")
          this.router.navigateByUrl("/day")
        })
    }else alert("Emails must match!")
  }
}
