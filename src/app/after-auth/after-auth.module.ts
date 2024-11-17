import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfterAuthRoutingModule } from './after-auth-routing.module';
import { AfterAuthComponent } from './after-auth.component';
import { TransactionComponent } from './transaction/transaction.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { HomeComponent } from './home/home.component';
import { MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ClientComponent } from './client/client.component';
import { TaskComponent } from './task/task.component';
import { ReviewsComponent } from './reviews/reviews.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddmessageComponent } from './transaction/addmessage/addmessage.component';
import { MessageComponent } from './message/message.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { AddComponent } from './inventory/add/add.component';
import { AddclientComponent } from './client/addclient/addclient.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { AddsaComponent } from './staff-attendance/addsa/addsa.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeComponent } from './home/employee/employee.component';
import { EditEmployeeComponent } from './home/edit-employee/edit-employee.component';
import { AddCustomerComponent } from './home/add-customer/add-customer.component';
import { EditCustomerComponent } from './home/edit-customer/edit-customer.component';
import { AddServiceComponent } from './home/add-service/add-service.component';
import { EditServiceComponent } from './home/edit-service/edit-service.component';
import { AddBillComponent } from './transaction/add-bill/add-bill.component';
import { PackagesComponent } from './packages/packages.component';
import { AddPackageComponent } from './packages/add-package/add-package.component';
import {MatCardModule} from '@angular/material/card';
import { AddCategoryComponent } from './inventory/add-category/add-category.component';
import { SelectServiceComponent } from './transaction/add-bill/select-service/select-service.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 

@NgModule({
  declarations: [
    AfterAuthComponent, 
    TransactionComponent,
    InventoryComponent,
    LeftpanelComponent,
    HomeComponent,
    ClientComponent,
    TaskComponent,
    ReviewsComponent,
    AddmessageComponent,
    MessageComponent,
    AddComponent,
    AddclientComponent,
    StaffAttendanceComponent,
    AddsaComponent,
    EmployeeComponent,
    EditEmployeeComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    AddServiceComponent,
    EditServiceComponent,
    AddBillComponent,
    PackagesComponent,
    AddComponent,
    AddPackageComponent,
    AddCategoryComponent,
    SelectServiceComponent,
    
  ],
  imports: [
    CommonModule,
    AfterAuthRoutingModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTreeModule,
    MatTabsModule,
    MatIconModule,
    NgChartsModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ],
  exports: [ 
    TransactionComponent,
    InventoryComponent,
    LeftpanelComponent,
    HomeComponent,
    ClientComponent,
    TaskComponent,
    ReviewsComponent,
    MessageComponent,
  ]
})
export class AfterAuthModule { }
