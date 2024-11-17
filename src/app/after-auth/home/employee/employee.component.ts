import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

interface SER {
  value: string;
  viewValue: string;
}

interface STY {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  // displayAppointData: any
  constructor(
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}
  @Output() close: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {}

  isLinear = false;

  shifts: SER[] = [
    { value: 'Morning', viewValue: 'Morning' },
    { value: 'Evening', viewValue: 'Evening' },
  ];

  attendance: STY[] = [
    { value: 'Present', viewValue: 'Present' },
    { value: 'Absent', viewValue: 'Absent' },
  ];

  employee = new FormGroup({
    name: new FormControl('', [Validators.required]),
    post: new FormControl('', [Validators.required]),
    attendance: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.employee.valid) {
      console.log(this.employee.value);
      this.close.emit();
      // to add the data
      this.dataProvider.pageSetting.blur = true;
      this.databaseService
        .addEmployee(this.employee.value)
        .then((res) => {
          this.close.emit();
          this.alertify.presentToast('Employee Added Successfully');
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

  reset() {
    this.employee.reset();
  }
}
