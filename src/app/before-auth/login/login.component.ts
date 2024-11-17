import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;
  hide = true;

  constructor(private routes: Router, private auth: AuthService) {}

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
      this.auth.emailLogin(this.loginForm.value.email, this.loginForm.value.password)
    }
  }
  
  googleSignIn() {
    this.auth.googleLogin();
  }
}
