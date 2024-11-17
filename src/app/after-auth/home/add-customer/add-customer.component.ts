import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  constructor(private databaseService:DatabaseService,private alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) {}
  @Output() close: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {}

  customers = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.customers.valid){
      console.log(this.customers.value);
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.addCustomer(this.customers.value).then((res) => {
      this.alertify.presentToast('Customer Added Successfully');
      this.close.emit();
    }).catch((err)=>{
      this.alertify.presentToast('Something went wrong','error');
    }).finally(()=>{
      this.reset();
      this.dataProvider.pageSetting.blur = false;
    })
    } else {
      this.alertify.presentToast('Please fill all the fields','error');
    }
  }

  reset() {
    this.customers.reset();
  }
}
