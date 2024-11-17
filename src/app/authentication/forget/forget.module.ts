import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetRoutingModule } from './forget-routing.module';
import { ForgetComponent } from './forget.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    ForgetComponent
  ],
  imports: [
    CommonModule,
    ForgetRoutingModule,
    MatFormFieldModule
  ]
})
export class ForgetModule { }
