import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeforeAuthRoutingModule } from './before-auth-routing.module';
import { BeforeAuthComponent } from './before-auth.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { ForgetComponent } from './forget/forget.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    BeforeAuthComponent,
    LoginComponent,
    OtpComponent,
    ForgetComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    BeforeAuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule

  ],
  exports: [
    LoginComponent,
    OtpComponent,
    ForgetComponent
  ]
})
export class BeforeAuthModule { }
