import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  title:string = 'Add Category'
  close:EventEmitter<any> = new EventEmitter<any>();
  constructor(private databaseService:DatabaseService,@Inject(MAT_DIALOG_DATA) public data: any,private dataProvider:DataProvider) { }
  services:any[] = []
  categoryForm:FormGroup = new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl(''),
  })
  ngOnInit(): void {
    if(this.data.mode=='edit'){
      this.title = "Edit Category"
    }
    this.databaseService.getServices().then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        this.services.push({...doc.data(),id:doc.id})
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  submit(){
    console.log(this.categoryForm.value);
    
    if(this.data.mode=='edit'){
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.updateCategory(this.data.id,this.categoryForm.value).then(()=>{
        this.close.emit()
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>this.dataProvider.pageSetting.blur = false)
    }else{
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.addCategory(this.categoryForm.value).then(()=>{
        this.close.emit()
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>this.dataProvider.pageSetting.blur = false)
    }
  }
}
