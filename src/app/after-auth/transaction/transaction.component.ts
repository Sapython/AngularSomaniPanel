import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddmessageComponent } from './addmessage/addmessage.component';
import { collection, Firestore } from '@angular/fire/firestore';
import {
  getDoc,
  doc,
  addDoc,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore';
import { AddBillComponent } from './add-bill/add-bill.component';
import { DatabaseService } from 'src/app/services/database.service';
import { DataProvider } from 'src/app/providers/data.provider';
// import { Item } from '@angular/fire/analytics';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  constructor(private dialog: MatDialog,private databaseService:DatabaseService,private dataProvider:DataProvider) {}
  totalCost: number = 0;
  ngOnInit(): void {
    this.dataProvider.pageSetting.blur = true;
    this.databaseService.getTransactions().then((data) => {
      this.transactions = [];
      let localTransactions:any[] = []
      data.forEach((doc) => {
        let data:any = doc.data()
        this.totalCost += data.finalCost;
        localTransactions.push({ ...data, id: doc.id });
      })
      localTransactions.sort((a,b)=>{
        return b.date - a.date;
      })
      this.transactions = localTransactions;
    }).finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

  selected = 'Select Year';

  title = 'Table';
  headers = [
    'S.No',
    'Name',
    'Email Address',
    'Service Name',
    'Stylists',
    'Transaction Id',
    'Status',
    'Appointment',
    'Amount',
    'Actions'
  ];

  export(){
  
  }

  openDialog() {
    const dialog = this.dialog.open(AddmessageComponent);
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  printBill(item:any){
    const dialog = this.dialog.open(AddBillComponent,{
      data:{
        mode:'print',
        item:item
      }
    });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }
  editBill(item:any){
    const dialog = this.dialog.open(AddBillComponent,{
      data:{
        mode:'edit',
        item:item
      }
    });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }
  deleteBill(item:any){
    if(confirm("Are you sure you want to delete this transaction?")){
      this.dataProvider.pageSetting.blur = true;
      this.databaseService.deleteBill(item.id).then(()=>{
        this.ngOnInit();
      }).catch((err)=>{
        this.dataProvider.pageSetting.blur = false;
      })
    }
  }

  addTransaction(){
    const dialog = this.dialog.open(AddBillComponent);
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }
}
