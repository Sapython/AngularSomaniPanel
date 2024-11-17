import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;
  hide = true;

  constructor(private routes: Router, public auth: AuthenticationService,public dataProvider:DataProvider) {}

  ngOnInit(): void {}

  loginForm: any = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  login() {
    if(this.loginForm.valid){
      this.auth.loginEmailPassword(this.loginForm.value.email, this.loginForm.value.password)
    }
  }
  
  googleSignIn() {
    this.auth.signInWithGoogle();
  }

}
