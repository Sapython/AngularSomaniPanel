import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControlName, FormControl} from '@angular/forms';
import { collection, Firestore } from '@angular/fire/firestore';
import { getDoc, doc, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private firestore: Firestore) { }
  @Output() close:EventEmitter<any>=new EventEmitter()
  ngOnInit(): void {
  }

customers = new FormGroup({
    name : new FormControl('',[Validators.required]),
    contact : new FormControl('',[Validators.required]),
  })

  submit(){
    console.log(this.customers.value);
    this.close.emit() 
    // to add the data
    addDoc(collection(this.firestore,'customers'),
      this.customers.value
      ).then((appointmentdata)=>{
        console.log('Doc added');
    }).catch((error) => alert("problem in add doc"))
}

reset(){
  this.customers.reset();
}
}