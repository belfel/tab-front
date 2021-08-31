import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({    
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router) {}

  hide = true;

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.authenticationService.login(this.f.username.value.trim(), this.f.password.value.trim())
      .subscribe((user) => {
          console.log(user);
          this.router.navigate(['/home']);
      })
  }
}