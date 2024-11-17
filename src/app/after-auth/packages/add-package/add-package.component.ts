import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {
  services: any[] = []
  employees: any[] = []
  categories: any[] = [];
  packageForm:FormGroup = new FormGroup({
    name:new FormControl("",[Validators.required]),
    price:new FormControl("",[Validators.required]),
    services:new FormControl(null,[Validators.required]),
    employees:new FormControl(null,[Validators.required]),
    category: new FormControl('', [Validators.required]),
  })
  constructor(private databaseService:DatabaseService,private dataProvider:DataProvider,private alertify:AlertsAndNotificationsService) { }

  ngOnInit(): void {
    Promise.all([this.databaseService.getServices(),this.databaseService.getEmployees(),this.databaseService.getCategories()])
    .then((responses)=>{
      this.services = []
      responses[0].forEach((service)=>{
        this.services.push({...service.data(),id:service.id})
      })
      this.employees = []
      responses[1].forEach((employee)=>{
        this.employees.push({...employee.data(),id:employee.id})
      })
      this.categories = []
      responses[2].forEach((doc) => {
        this.categories.push({...doc.data(),id:doc.id})
      });
    })
  }

  submit(){
    if(this.packageForm.valid){
      this.dataProvider.pageSetting.blur = true
      this.databaseService.addPackage(this.packageForm.value).then(()=>{
        this.packageForm.reset()
        this.alertify.presentToast("Package Added")
      }).catch((err)=>{
        this.alertify.presentToast(err.message,'error')
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false
      })
    }else{
      this.alertify.presentToast("Please fill all the fields",'error')
    }
  }

}
