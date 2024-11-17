import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { SelectServiceComponent } from './select-service/select-service.component';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss'],
})
export class AddBillComponent implements OnInit {
  constructor(
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  dicountControl:FormControl = new FormControl();
  dicountTypeControl:FormControl = new FormControl();
  servicesControl: FormControl = new FormControl();
  services: any[] = [];
  gstNo: string = '09AJSPS8456P3ZP';
  today: Date = new Date();
  billNo: string = '324';
  servicesForm: FormGroup = new FormGroup({});
  billForm: FormGroup = new FormGroup({
    customerName: new FormControl(''),
    customerEmail: new FormControl('', Validators.email),
    customerPhone: new FormControl('', [
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    customerAddress: new FormControl(),
    appointmentDate: new FormControl(),
    services: this.servicesForm,
    finalCost: new FormControl(),
    discount: this.dicountControl,
    discountType: this.dicountTypeControl,
    tax: new FormControl(18),
    stylist: new FormControl(),
    extraNote: new FormControl(),
  });
  finalCost: number = 0;
  totalTax: number = 0;
  totalQuantity: number = 0;
  totalTaxCost: number = 0;
  totalDiscount: number = 0;
  appliedDiscount: number = 0;
  addedControls: any[] = [];
  listeners: any[] = [];
  employees: any[] = [];
  categories: any[] = [];
  loaded: boolean = false;
  totalCGST: number = 0;
  totalCGSTCost: number = 0;
  close: EventEmitter<any> = new EventEmitter();
  subtotal:number=0;
  addControls(event: any,customServices?:any[]) {
    // alert("customServices" +JSON.stringify(customServices) || "no")
    // remove all controls
    this.addedControls.forEach((control) => {
      this.servicesForm.removeControl(control.control.name);
      this.servicesForm.removeControl(control.quantityControl.name);
    });
    // this.addedControls = []
    console.log(event);
    event.value.forEach((serviceId: any) => {
      if (this.addedControls.find((control) => control.id == serviceId)) return;
      if (customServices && customServices?.length > 0) {
        var service = customServices.find((service) => service.id == serviceId);
        console.log("custom service",service);
      } else {
        var service = this.services.find((service) => service.id == serviceId);
        console.log("service",service);
      }
      let control = new FormControl(service.price, Validators.required);
      let quantityControl = new FormControl(1, Validators.required);
      this.servicesForm.addControl(service.name, control);
      this.servicesForm.addControl(service.name + 'Quantity', quantityControl);
      // this.billForm.controls.services.setValue(this.servicesForm)
      this.addedControls.push({
        control: control,
        id: serviceId,
        employees:new FormControl(service.employees ? service.employees.map((employee:any)=>employee.id) : []),
        category: service.category,
        name: service.name,
        quantityControl: quantityControl,
        quantityControlName: service.name + 'Quantity',
        deductedPrice: service.price - ((service.price / 100) * 18),
      });
    });
    this.listeners.forEach((listener) => listener.unsubscribe());
    this.listeners = [];
    this.addedControls.forEach((control) => {
      control.control.valueChanges.subscribe((value: any) => {
        this.calculateBill();
      });
      control.quantityControl.valueChanges.subscribe((value: any) => {
        this.calculateBill();
      });
    });
    this.calculateBill();
  }

  removeControl(index:number){
    this.servicesForm.removeControl(this.addedControls[index].control.name);
    this.servicesForm.removeControl(this.addedControls[index].quantityControl.name);
    this.addedControls.splice(index,1)
    this.calculateBill()
  }

  calculateBill() {
    let prices: number[] = [];
    let totalPrice = 0;
    this.finalCost = 0;
    // console.log("this.addedControls",this.addedControls);
    this.totalQuantity = 0;
    this.totalTaxCost = 0;
    this.addedControls.forEach((item,index) => {
      let deductedPrice = item.control.value - ((item.control.value / 100) * 18)
      this.addedControls[index].deductedPrice = deductedPrice
      prices.push(deductedPrice);
      totalPrice += Number(deductedPrice) * Number(item.quantityControl.value);
      this.totalQuantity += Number(item.quantityControl.value);
      this.totalTaxCost += (item.control.value / 100) * 18;
    });
    console.log('prices', prices,this.totalQuantity,totalPrice);
    if(this.billForm.value.discountType=='fixed'){
      this.totalDiscount = this.billForm.value.discount || 0;
    } else if (this.billForm.value.discountType=='percentage') {
      this.totalDiscount = ((this.subtotal/100)*this.billForm.value.discount) || 0;
    } else {
      this.totalDiscount = 0;
    }
    this.subtotal=Math.ceil(totalPrice);
    let finalCost = totalPrice - (this.totalDiscount || 0);
    this.totalCGST = this.billForm.value.tax / 2;
    this.totalCGSTCost = this.totalTaxCost / 2;
    this.totalTax = this.billForm.value.tax;
    // this.totalTaxCost = Math.ceil((finalCost / 100) * this.billForm.value.tax);
    console.log("this.billForm.value.discount",this.billForm.value.discount,this.totalDiscount,this.totalTaxCost,finalCost)
    this.finalCost = Math.ceil(finalCost + this.totalTaxCost);
    console.log(this.totalTax, this.totalDiscount, this.finalCost);
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  ngOnInit(): void {
    // this.dicountControl.valueChanges.subscribe((value) => {
    //   this.calculateBill();
    // });
    // this.dicountTypeControl.valueChanges.subscribe((value) => {
    //   this.calculateBill();
    // });
    if (this.data) {
      console.log('this.data', this.data);
      if (this.data.mode == 'edit') {
        this.dataProvider.pageSetting.blur = true;
      }
    }
    this.categories = [];
    this.services = [];
    this.employees = [];
    Promise.all([
      this.databaseService.getServices(),
      this.databaseService.getCategories(),
      this.databaseService.getEmployees(),
    ]).then((data) => {
      data[1].forEach((doc) => {
        this.categories.push({ ...doc.data(), id: doc.id });
      });
      data[0].forEach((doc) => {
        this.services.push({
          ...doc.data(),
          id: doc.id,
          price: doc.data()['price'],
          category: this.categories.find(
            (category) => category.id == doc.data()['category']
          ),
        });
      });
      data[2].forEach((doc: any) => {
        if (doc.data().attendance == 'Present') {
          this.employees.push({ ...doc.data(), id: doc.id });
        }
      });
      this.loaded = true;
      if (this.data) {
        console.log('this.data', this.data);
        if (this.data.mode == 'edit') {
          this.billForm.patchValue(this.data.item);
          var servicesIds = this.data.item.services.map((item: any) => item.id);
          this.addControls({ value: servicesIds },this.data.item.services);
          this.servicesControl.setValue(servicesIds);
          this.dataProvider.pageSetting.blur = false;
          this.finalCost = this.data.item.finalCost;
          this.calculateBill();
        }
      }
    });
  }

  saveAndPrint() {
    if (this.billForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      console.log(this.billForm.value);
      let services: any[] = [];
      this.addedControls.forEach((item) => {
        let employees:any[] = [];
        item.employees.value.forEach((employee:any)=>{
          employees.push(this.employees.find((emp:any)=>emp.id == employee))
        })
        services.push({
          name: item.name,
          price: item.control.value,
          quantity: item.quantityControl.value,
          id: item.id,
          category: item.category,
          employees:employees
        });
      });
      
      this.billForm.value.services = services;
      this.printBill();
      if(this.data && this.data.mode == 'edit'){
        this.databaseService
        .updateTransaction({...this.billForm.value,finalCost:this.finalCost,date:new Date(),status:'Printed'},this.data.item.id)
        .then((data) => {
          this.alertify.presentToast('Transaction updated successfully');
          this.close.emit();
        })
        .catch((err) => {
          this.alertify.presentToast('Error updating transaction');
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        });
      } else {
        this.databaseService
        .addTransaction({...this.billForm.value,finalCost:this.finalCost,date:new Date(),status:'Printed'})
        .then((data) => {
          this.alertify.presentToast('Transaction added successfully');
          this.close.emit();
        })
        .catch((err) => {
          this.alertify.presentToast('Error adding transaction');
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        });
      }
    }
  }

  holdBill() {
    if (this.billForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      console.log(this.billForm.value);
      let services: any[] = [];
      this.addedControls.forEach((item) => {
        let employees:any[] = [];
        item.employees.value.forEach((employee:any)=>{
          employees.push(this.employees.find((emp:any)=>emp.id == employee))
        })
        services.push({
          name: item.name,
          price: item.control.value,
          quantity: item.quantityControl.value,
          id: item.id,
          category: item.category,
          employees:employees
        });
      });
      this.billForm.value.services = services;
      // this.printBill();
      if(this.data && this.data.mode == 'edit'){
        this.databaseService
        .updateTransaction({...this.billForm.value,finalCost:this.finalCost,updateDate:new Date(),status:'Hold'},this.data.item.id)
        .then((data) => {
          this.alertify.presentToast('Transaction updated successfully');
          this.close.emit();
        })
        .catch((err) => {
          this.alertify.presentToast('Error updating transaction');
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        });
      } else {
        this.databaseService
        .addTransaction({...this.billForm.value,finalCost:this.finalCost,date:new Date(),status:'Hold'})
        .then((data) => {
          this.alertify.presentToast('Transaction added successfully');
          this.close.emit();
        })
        .catch((err) => {
          this.alertify.presentToast('Error adding transaction');
        }).finally(()=>{
          this.dataProvider.pageSetting.blur = false;
        });
      }
    } else {
      this.alertify.presentToast('Please fill all the fields');
    }
  }

  printBill() {
    (document.querySelector('app-root') as HTMLElement).style.display = 'none';
    (
      document.querySelector('.cdk-overlay-container') as HTMLElement
    ).style.visibility = 'hidden';
    const div = document.createElement('div');
    div.id = 'bill';
    div.style.visibility = 'visible';
    div.innerHTML = document.querySelector('#billMain')!.innerHTML;
    document.body.appendChild(div);
    document.querySelector('body')!.appendChild(div);
    setTimeout(() => {
      window.print();
      (document.querySelector('app-root') as HTMLElement).style.display =
        'block';
      (
        document.querySelector('.cdk-overlay-container') as HTMLElement
      ).style.visibility = 'visible';
      document.body.removeChild(div);
    }, 200);
  }

  getDate(date: Timestamp | Date) {
    if (date instanceof Timestamp) {
      return date.toDate();
    } else {
      return date;
    }
  }

  selectServices() {
    console.log();
    this.services.forEach((data)=>{if(!data.id){console.log(data)}})
    const dialog = this.dialog.open(SelectServiceComponent, {
      data: { services: this.services, categories: this.categories },
    });
    dialog.disableClose = true;
    dialog.componentInstance.close.subscribe((data) => {
      if (data) {
        console.log(data);
        var servicesIds = data.map((item: any) => item.id);
        // remove any undefined ids
        servicesIds = servicesIds.filter((item: any) => item);
        this.addControls({ value: servicesIds });
        this.servicesControl.setValue(servicesIds);
      }
      dialog.close();
    });
  }
}
