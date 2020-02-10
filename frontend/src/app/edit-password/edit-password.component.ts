import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-password",
  templateUrl: "./edit-password.component.html",
  styleUrls: ["./edit-password.component.scss"]
})
export class EditPasswordComponent implements OnInit {
  username = localStorage.getItem("username");
  password: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  passwordComfirm: string;

  isShow: boolean = false;

  editPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  // Initialize the components, add validation of forms
  ngOnInit() {
    this.editPasswordForm = this.formBuilder.group({
      oldPassword: [
        this.oldPassword,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      newPassword: [
        this.newPassword,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      passwordComfirm: [
        this.passwordComfirm,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ]
    });
    this.service.getUser(this.username).subscribe(user => {
      this.password = user.password;
      this.email = user.email;
    });
  }

  // Close edit password part
  closeEditPassword() {
    this.router.navigateByUrl("/day");
  }

  // Create a new user
  createUser(): UserModel {
    let user = {
      username: this.username,
      password: this.newPassword,
      email: this.email
    };
    return user;
  }

  // Function when clicking on submit button
  onSubmit() {
    if (this.oldPassword === this.password) {
      if (this.newPassword === this.passwordComfirm) {
        this.service.updateUser(this.createUser()).subscribe(user => {
          console.log(user);
          localStorage.setItem("password", this.newPassword);
          alert("Password changed succcessfully!");
          this.router.navigateByUrl("/day");
        });
      } else alert("Passwords must match!");
    } else alert("Please input the correct old password!");
  }
}
