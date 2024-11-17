import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

import { Auth, signInWithPopup, GoogleAuthProvider, signOut, UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: any;
  hide = true;
  constructor(private routes: Router, private auth: AuthService, private Auth:Auth) { }

  ngOnInit(): void {
  }

  // date and time  
  time = (new Date()).getHours();

  loginForm : any = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

// signup the user using (email & password)
register(){
  if (this.loginForm.valid) {
    this.auth.emailSignup(this.loginForm.value.email, this.loginForm.value.password)
    .then(() => {
      alert("Signed up")
      this.routes.navigate(['/before-auth/login']);
    })
    .catch((error: any) => alert("Invalid Sign Up" + error.toString()));
  } else {
    alert("Invalid Signup Form");
    this.routes.navigate(['/before-auth/signup'])
  }
}

// signup the user using the (google-auth)
googleSignup(){
  signInWithPopup(this.Auth, new GoogleAuthProvider()).then(
    async (credentials: UserCredential) => {
      this.user = credentials.user;
      this.routes.navigate(['/before-auth/login']);
    }
  );
}


// to redirect to login page
login(){
  this.routes.navigate(['/before-auth/login'])
}


}
