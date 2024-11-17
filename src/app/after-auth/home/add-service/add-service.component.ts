import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControlName,
  FormControl,
} from '@angular/forms';
import { collection, Firestore } from '@angular/fire/firestore';
import { getDoc, doc, addDoc } from 'firebase/firestore';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
})
export class AddServiceComponent implements OnInit {
  categories: any[] = [];
  constructor(
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}
  @Output() close: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.databaseService.getCategories().then((data) => {
      this.categories = [];
      data.forEach((doc) => {
        this.categories.push({ ...doc.data(), id: doc.id });
      });
    });
  }

  servicesForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    category: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.servicesForm.valid) {
      console.log(this.servicesForm.value);
      this.close.emit();
      // to add the data
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .addService(this.servicesForm.value)
        .then((res) => {
          console.log(res);
          this.alertify.presentToast('Service Added Successfully');
        })
        .catch((err) => {
          this.alertify.presentToast('Something went wrong', 'error');
        })
        .finally(() => {
          this.reset();
          this.dataProvider.pageSetting.blur = false;
        });
    } else {
      this.alertify.presentToast('Please fill all the fields', 'error');
    }
  }

  reset() {
    this.servicesForm.reset();
  }
}
