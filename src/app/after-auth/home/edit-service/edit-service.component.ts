import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
})
export class EditServiceComponent implements OnInit {
  categories: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public services: any,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}
  @Output() close: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.dataProvider.pageSetting.blur = true;
    this.databaseService
      .getCategories()
      .then((data) => {
        this.categories = [];
        data.forEach((doc) => {
          this.categories.push({ ...doc.data(), id: doc.id });
        });
        this.serviceForm.patchValue(this.services);
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }

  serviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    category: new FormControl('', [Validators.required]),
  });

  edit(id: string) {
    if (this.serviceForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .updateService(id, this.serviceForm.value)
        .then((res) => {
          this.close.emit();
          this.alertify.presentToast('Service Updated Successfully');
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
