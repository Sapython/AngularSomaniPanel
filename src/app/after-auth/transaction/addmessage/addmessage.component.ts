import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControlName, FormControl} from '@angular/forms';
import { collection, Firestore } from '@angular/fire/firestore';
import { getDoc, doc, addDoc } from 'firebase/firestore';

interface SER {
  value: string;
  viewValue: string;
}

interface STY{
  value: string;
  viewValue: string; 
} 
@Component({
  selector: 'app-addmessage',
  templateUrl: './addmessage.component.html', 
  styleUrls: ['./addmessage.component.css']
})
export class AddmessageComponent implements OnInit {
  displayAppointData: any
  constructor(private _formBuilder: FormBuilder, private firestore: Firestore) { }
  @Output() close:EventEmitter<any>=new EventEmitter()
  
  ngOnInit(): void {
  }

  isLinear = false;
  

  services: SER[] = [
    {value: 'Nail Art-0', viewValue: 'Nail Art'},
    {value: 'Shaving-1', viewValue: 'Shaving'},
    {value: 'Haircut-2', viewValue: 'Haircut'},
    {value: 'Shampoo-3', viewValue: 'Shampoo'},
    {value: 'Hair Dryer-4', viewValue: 'Hair Dryer'},
  ];

  stylists: STY[]=[ 
    {value: 'Auctor-0', viewValue: 'Auctor1'},
    {value: 'Auctor-1', viewValue: 'Auctor2'},
    {value: 'Auctor-2', viewValue: 'Auctor3'},
    {value: 'Auctor-3', viewValue: 'Auctor4'},
    {value: 'Auctor-4', viewValue: 'Auctor5'},
  ]

  
  appointment = new FormGroup({
    name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    services : new FormControl('',[Validators.required]),
    stylists : new FormControl('',[Validators.required]),
    transaction_id : new FormControl('',[Validators.required]),
    amount : new FormControl('',[Validators.required]),
  })
   
  // add data
  submit(){
    console.log(this.appointment.value);
    this.close.emit() 
    // to add the data
    addDoc(collection(this.firestore,'appointmentdata'),
      {
        name:this.appointment.value.name, 
        email: this.appointment.value.email,
        service: this.appointment.value.services, 
        stylists: this.appointment.value.stylists,
        transaction_id : this.appointment.value.transaction_id,
        amount : this.appointment.value.amount
      }).then((appointmentdata)=>{
        console.log('Doc added');
    }).catch((error) => alert("problem in add doc"))


    

  }













}
