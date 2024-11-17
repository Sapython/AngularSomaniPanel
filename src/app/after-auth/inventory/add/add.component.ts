import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName, FormControl, FormArray } from '@angular/forms';
import { collection, Firestore } from '@angular/fire/firestore';
import { getDoc, doc, addDoc } from 'firebase/firestore';
import { MatButton } from '@angular/material/button';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

interface SER {
  value: string;
  viewValue: string;
}

// interface STY{
//   value: string;
//   viewValue: string; 
// } 


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output() close:EventEmitter<any> = new EventEmitter();
  featuresForm: FormGroup = new FormGroup({});
  addServiceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    cost: new FormControl(''),
    tax: new FormControl(''),
    discount: new FormControl(''),
    features: this.featuresForm
  });
  activeTab:number = 0;
  features: {control:FormControl,types:{name:FormControl,price:FormControl}[]}[] = [];
  ngOnInit(): void {
      
  }

  addFeature(){
    let control = new FormControl('')
    this.features.push({
      control:control,
      types:[]
    });
    this.featuresForm.addControl('feature'+this.features.length+1, control);
  }

  removeFeature(index: number){
    this.features.splice(index, 1);
    this.featuresForm.removeControl('feature'+index+1);
  }

  addType(feature:any){
    let name = new FormControl('');
    let price = new FormControl('');
    feature.types.push({
      name:name,
      price:price
    });
  }

  removeType(feature:any, index:number){
    feature.types.splice(index, 1); 
  }

  finalSubmit(){
    // get all the values in single object
    let data = this.addServiceForm.value;
    this.features.forEach((feature, index) => {
      data['feature'+(index+1)] = feature.control.value;
      feature.types.forEach((type, index) => {
        data['feature'+(index+1)+'type'+(index+1)] = type.name.value;
        data['feature'+(index+1)+'type'+(index+1)+'price'] = type.price.value;
      });
    });
    console.log(data);
  }
}








