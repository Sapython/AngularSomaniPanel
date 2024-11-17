import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'after-auth',
    loadChildren: () =>
      import('./after-auth/after-auth.module').then((m) => m.AfterAuthModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./authentication/signup/signup.module').then(
        (m) => m.SignupModule
      ),
  },
  {
    path: 'forget',
    loadChildren: () =>
      import('./authentication/forget/forget.module').then(
        (m) => m.ForgetModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./authentication/otp/otp.module').then((m) => m.OtpModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
