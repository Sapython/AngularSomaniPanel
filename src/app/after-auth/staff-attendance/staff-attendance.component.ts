import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddsaComponent } from './addsa/addsa.component';

@Component({
  selector: 'app-staff-attendance',
  templateUrl: './staff-attendance.component.html',
  styleUrls: ['./staff-attendance.component.css']
})
export class StaffAttendanceComponent implements OnInit {
  title = 'Table'
  headers = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  staffs = [
    {
      "name" : "Rahul",
      "monday" : "Present",
      "tuesday" :"Present",
      "wednesday" :"Present",
      "thursday" : "Absent" , 
      "friday" : "Absent"
  
    },
    {
      "name" : "David",
      "monday" : "Present",
      "tuesday" :"Present",
      "wednesday" :"Present",
      "thursday" : "Absent",
      "friday" : "Absent"
  
    },
    {
      "name" : "Rohan",
      "monday" : "Present",
      "tuesday" :"Present",
      "wednesday" :"Present",
      "thursday" : "Absent",
      "friday" : "Absent"
  
    },
    {
      "name" : "Danil",
      "monday" : "present",
      "tuesday" :"Present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Avi",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Shubham",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Sourav",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Ritik",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Aman",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Shivam",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Shiva",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Nouman",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Naman",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Rohan",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Aditya",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Sanjay",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Deepak",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Sahib",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Vipul",
      "monday" : "present",
      "tuesday" :"present",
      "wednesday" :"Present",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
    {
      "name" : "Satyam",
      "monday" : "present",
      "tuesday" :"presen",
      "wednesday" :"presen",
      "thursday" : "absent",
      "friday" : "absent"
  
    },
  ]
  dialogRef: any;

  constructor(private dialog : MatDialog) { }

   openDialog(){
     this.dialog.open(AddsaComponent);
   }

  ngOnInit(): void {
  }
  id: any = '';
  steam(ids:any){
    if(this.id == ids){
      this.id = '';
    }
    else{
      this.id = ids;
    }
  }

}