import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: any;
  hide = true;

  constructor(private routes: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {}

  loginForm: any = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  signup() {
    if(this.loginForm.valid){
      this.auth.signUpWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.name)
    }
  }
  
  googleSignIn() {
    this.auth.signInWithGoogle();
  }

}
