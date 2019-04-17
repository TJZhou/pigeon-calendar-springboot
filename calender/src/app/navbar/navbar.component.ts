import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {

  email: string;
  password: string;

  constructor(public loginDialog: MatDialog) { }

  ngOnInit() {
  }

  openLogin(): void {
    const dialogRef = this.loginDialog.open(LoginComponent, {
      width: '600px',
      height: '800px',
      data: {name: this.email, animal: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
