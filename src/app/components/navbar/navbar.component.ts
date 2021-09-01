import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role';
import { Worker } from 'src/app/models/worker';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  expanded: boolean = false;

  searchText: string | undefined;

  user: Worker = JSON.parse(localStorage.getItem('user')!);

  isAdmin = false;

  messagesNumber: number = 0;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  expandMenu() {
    this.expanded = !this.expanded;
  }

  logout() {
    this.authenticationService.logout();
  }

  isLoggedIn() {
    //return this.authenticationService.userValue;
    return true;
  }

  gotoHome() {
    this.router.navigateByUrl('/search').then(() => {
      this.router.navigate(['/home']);
    });
  }
}