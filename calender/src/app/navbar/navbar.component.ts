import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
// }

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string = localStorage.getItem("username")
	isMenuHidden: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showMenu(){
    this.isMenuHidden = !this.isMenuHidden
  }

  changePassword(){
    this.isMenuHidden = !this.isMenuHidden
    this.router.navigateByUrl("/editpassword")
  }

  changeEmail(){
    this.isMenuHidden = !this.isMenuHidden
    this.router.navigateByUrl("/editemail")
  }

  logOut(){
    this.isMenuHidden = !this.isMenuHidden
    this.router.navigateByUrl("login");
  }

}
