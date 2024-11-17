import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public customers: any,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}
  @Output() close: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.customerForm.patchValue(this.customers);
  }

  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
  });

  edit(id: string) {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateCustomer(id, this.customerForm.value)
        .then((res) => {
          this.close.emit();
          this.alertify.presentToast('Customer Updated Successfully');
        })
        .catch((err) => {
          this.alertify.presentToast('Something went wrong', 'error');
        })
        .finally(() => {
          this.dataProvider.pageSetting.blur = false;
        });
    } else {
      this.alertify.presentToast('Please fill all the fields', 'error');
    }
  }
}
