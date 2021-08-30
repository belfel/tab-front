import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  dep: Department[] =[];

  ngOnInit(): void {
    this.authenticationService.login("admin", "admin").subscribe((response) => {
      var user = response;
    })
  }
}