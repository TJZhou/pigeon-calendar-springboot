import { UserService } from './../services/user.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-check-profile-details',
  templateUrl: './check-profile-details.component.html',
  styleUrls: ['./check-profile-details.component.scss']
})
export class CheckProfileDetailsComponent implements OnInit {

  // username = localStorage.getItem("username");
  // email = localStorage.getItem("email");

  @Input() id: string ;
  constructor(
    public dialogRef: MatDialogRef<CheckProfileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
