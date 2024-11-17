import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

interface SHF {
  value: string;
  viewValue: string;
}

interface ATD {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public employee: any,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}
  @Output() close: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this.employeeForm.patchValue(this.employee);
  }

  shifts: SHF[] = [
    { value: 'Morning', viewValue: 'Morning' },
    { value: 'Evening', viewValue: 'Evening' },
  ];

  attendance: ATD[] = [
    { value: 'Present', viewValue: 'Present' },
    { value: 'Absent', viewValue: 'Absent' },
  ];

  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    post: new FormControl('', [Validators.required]),
    attendance: new FormControl('', [Validators.required]),
  });

  async edit(id: string) {
    if (this.employeeForm.valid){
      if (this.employee.attendance != this.employeeForm.value.attendance) {
        try {
          this.dataProvider.pageSetting.blur = true;
          var data = {
            ...this.employeeForm.value,
            date: new Date(),
            attendance:'Present',
            code:
              new Date().getDate() +
              '-' +
              new Date().getMonth() +
              '-' +
              new Date().getFullYear(),
          };
          var res:any;
          if (this.employee.code == data.code) {
            console.log("Updated value",this.employeeForm.value.attendance)
            data.attendance = this.employeeForm.value.attendance || 'Absent';
            
            try {
              await this.databaseService.updateAttendance(
                data,
                this.employee.id,
                this.employee.attendanceId
              );
              res = {id:this.employee.attendanceId}
            } catch (error) {
              console.log("Updating error:",error);
            }
            console.log("res is ",res)
          } else {
            res = await this.databaseService.addAttendance(data, this.employee.id);
          }
          if (!res){
            console.log("Error res is ",res)
            this.alertify.presentToast('Something went wrong', 'error');
            return;
          }
          var employeeFormData = {
            ...this.employeeForm.value,
            code:data.code,
            attendanceId:res.id
          }
          await this.databaseService.updateEmployee(id, employeeFormData);
          this.close.emit();
          this.alertify.presentToast('Employee Updated Successfully');
        } catch (error) {
          console.log(error);
          this.alertify.presentToast('Something went wrong', 'error');
        } finally {
          this.dataProvider.pageSetting.blur = false;
        }
      } else {
        this.dataProvider.pageSetting.blur = true;
        this.databaseService
          .updateEmployee(id, this.employeeForm.value)
          .then((res) => {
            this.close.emit();
            this.alertify.presentToast('Employee Updated Successfully');
          })
          .catch((err) => {
            this.alertify.presentToast('Something went wrong', 'error');
          })
          .finally(() => {
            this.dataProvider.pageSetting.blur = false;
          });
      }
    }
  }
}
