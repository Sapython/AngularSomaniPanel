import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';
import { OtpComponent } from './otp/otp.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// import { BeforeAuthComponent } from './before-auth.component';

const routes: Routes = [
{ 
  path: '', 
  component: LoginComponent,
  pathMatch : "full"
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'forget',
  component: ForgetComponent
},
{
  path: 'otp',
  component: OtpComponent
},
{
  path: 'signup',
  component: SignUpComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeforeAuthRoutingModule { }
