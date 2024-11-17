import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AfterAuthComponent } from './after-auth.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MessageComponent } from './message/message.component';
import { PackagesComponent } from './packages/packages.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { TaskComponent } from './task/task.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: '',
    component: AfterAuthComponent,
    children: [
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'transaction',
        component: TransactionComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
      {
        path: 'message',
        component: MessageComponent,
      },
      {
        path: 'task',
        component: TaskComponent,
      },
      {
        path: 'review',
        component: ReviewsComponent,
      },
      {
        path: 'staff-attendance',
        component: StaffAttendanceComponent,
      },
      {
        path: 'packages',
        component: PackagesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfterAuthRoutingModule {}
