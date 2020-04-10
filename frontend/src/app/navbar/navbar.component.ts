import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string = localStorage.getItem("username")
	isMenuHidden: boolean = true;

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() {
  }

  // Control if menu is display
  showMenu(){
    this.isMenuHidden = !this.isMenuHidden
  }

  // Change password
  changePassword(){
    this.isMenuHidden = !this.isMenuHidden
    this.router.navigateByUrl("/editpassword")
  }

  // Change email
  changeEmail(){
    this.isMenuHidden = !this.isMenuHidden
    this.router.navigateByUrl("/editemail")
  }


  // Log out 
  logOut(){
    this.isMenuHidden = !this.isMenuHidden
    this.auth.invalidate();
  }
}
