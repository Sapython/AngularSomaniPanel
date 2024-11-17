import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddclientComponent } from './addclient/addclient.component';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private dialog: MatDialog,
    private dataProvider:DataProvider,
    private alertify:AlertsAndNotificationsService
  ) {}
  customersData: any[] = [];
  ngOnInit(): void {
    Promise.all([this.databaseService.getCustomers(),this.databaseService.getTransactions()]).then((querySnapshots) => {
      this.customersData = [];
      querySnapshots[0].forEach((doc: any) => {
        this.customersData.push({ ...doc.data(), id: doc.id });
      });
      querySnapshots[1].forEach((doc: any) => {
        let data = doc.data();
        this.customersData.push({name:data.customerName,contact:data.customerPhone,email:data.customerEmail,id:data.id})
      })
    });
  }

  title = 'Table';
  headers = ['S.no', 'Name', 'Contact', 'Actions'];

  openDialog() {
    const dialog = this.dialog.open(AddclientComponent);
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  updateCustomer(customers: any) {
    const dialog = this.dialog.open(AddclientComponent, {
      data: customers,
    });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  deleteCustomer(id: string) {
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.deleteCustomer(id).then(() => {
      this.alertify.presentToast('Customer Deleted Successfully');
    }).catch((err) => {
      this.alertify.presentToast('Something went wrong');
    }).finally(() => {
      this.dataProvider.pageSetting.blur = false;
    });
  }
}
