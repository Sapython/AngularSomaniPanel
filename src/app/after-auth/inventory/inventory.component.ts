import { Component, OnInit } from '@angular/core';
import { AddComponent } from './add/add.component';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../home/add-service/add-service.component';
import { EditServiceComponent } from '../home/edit-service/edit-service.component';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { DataProvider } from 'src/app/providers/data.provider';
import { AddCategoryComponent } from './add-category/add-category.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  panelOpenState = false;
  header = ['S.no.', 'Services', 'Price', 'Category', 'Actions'];
  categoriesHeader = ['S.no.', 'Category', 'Description', 'Actions'];
  display = false;
  items: any[] = [];
  servicesData: any[] = [];
  categoriesData: any[] = [];
  
  constructor(
    private dialog: MatDialog,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}

  ngOnInit(): void {
    this.categoriesData = [];
    this.servicesData = [];
    this.dataProvider.pageSetting.blur = true;
    Promise.all([
      this.databaseService.getServices(),
      this.databaseService.getCategories(),
    ])
      .then((querySnapshots) => {
        querySnapshots[1].forEach((doc: any) => {
          this.categoriesData.push({ ...doc.data(), id: doc.id });
        });
        querySnapshots[0].forEach((doc: any) => {
          this.servicesData.push({
            ...doc.data(),
            id: doc.id,
            category: this.categoriesData.find(
              (element) => element.id == doc.data()['category']
            ),
          });
        });
      })
      .catch((err) => {
        console.log(err);
        this.alertify.presentToast('Error in getting services', 'error');
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }

  uploadFromCsv(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    let categoriesToAdd: any[] = [];
    reader.onload = async (e) => {
      const text = reader.result;
      const lines = text!.toString().split('\r\n');
      const result = [];
      const headers = lines[0].split(',');
      console.log("headers",headers);
      for (let i = 1; i < lines.length; i++) {
        var regExp = /[a-zA-Z]/g;
        if (regExp.test(lines[i]) == false) {
          continue;
        }
        const obj:any = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
          if (!currentline[j]){
            break
          }
          console.log(currentline);
          if (headers[j]=="price"){
            obj[headers[j]] = Number(currentline[j]);
          } else if(headers[j]=="category") {
            // currentline[j]
            const category = this.categoriesData.find((element) => element.name.toLowerCase() == currentline[j].toLowerCase());
            if (category){
              obj[headers[j]] = category;
            } else {
              obj[headers[j]] = {name: this.toTitleCase(currentline[j]),description:''};
              categoriesToAdd.push(obj[headers[j]]);
              this.categoriesData.push(obj[headers[j]]);
            }
          } else {
            obj[headers[j]] = this.toTitleCase(currentline[j]);
          }
        }
        console.log("obj",obj);
        
        if (Object.keys(obj).length > 0 && obj.name && obj.price && obj.category){
          result.push(obj);
        }
      }
      console.log(result,categoriesToAdd);
      this.servicesData = result;
      // upload categories to database
      // for (let i = 0; i < categoriesToAdd.length; i++) {
      //   const element = categoriesToAdd[i];
      //   let res = await this.databaseService.addCategory(element);
      //   element.id = res.id;
      //   // update categoiresData
      //   this.categoriesData = this.categoriesData.map((item) => {
      //     if (item.name == element.name){
      //       return element;
      //     } else {
      //       return item;
      //     }
      //   });
      // }
      console.log("Finished",this.servicesData,this.categoriesData);
      // return
      // upload to database
      this.dataProvider.pageSetting.blur = true;
      for (let i = 0; i < this.servicesData.length; i++) {
        const element = this.servicesData[i];
        // ignore if already in servicesdata
        if (this.servicesData.find((item) => item.name == element.name && item.price == element.price)){
          continue;
        }
        console.log("element",element);
        await this.databaseService.addService(element);
      }
    };
    reader.readAsText(file);
  }

  export(){
    // var doc: any = new jsPDF();
    // // finals
    // doc.autoTable({
    //   head: [['S.no.', 'Service', 'Price', 'Category']],
    //   body: this.servicesData.map((item, index) => [
    //     index + 1,
    //     item.name,
    //     item.price,
    //     item.category?.name || '',
    //   ]),
    // });
    // doc.save('Services.pdf');
    // convert services to csv
    var csv = this.servicesData.map((item, index) => [
      index + 1,
      item.name,
      item.price,
      item.category?.name || '',
    ]);
    var csvContent = 'data:text/csv;charset=utf-8,';
    csv.forEach(function (rowArray) {
      let row = rowArray.join(',');
      csvContent += row + '\r \n';
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Services.csv');
    document.body.appendChild(link);
    link.click();
    // convert categories to csv
    var csv = this.categoriesData.map((item, index) => [
      index + 1,
      item.name,
      item.description,
    ]);
    var csvContent = 'data:text/csv;charset=utf-8,';
    csv.forEach(function (rowArray) {
      let row = rowArray.join(',');
      csvContent += row + '\r \n';
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Categories.csv');
    document.body.appendChild(link);
    link.click();

  }

  addServices() {
    const dialog = this.dialog.open(AddServiceComponent);
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  addCategory() {
    const dialog = this.dialog.open(AddCategoryComponent, { data: 'add' });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  updateService(services: any) {
    const dialog = this.dialog.open(EditServiceComponent, {
      data: services,
    });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  updateCategory(category: any) {
    const dialog = this.dialog.open(AddCategoryComponent, {
      data: { mode: 'add', category: category },
    });
    dialog.componentInstance.close.subscribe(() => {
      dialog.close();
      this.ngOnInit();
    });
  }

  deleteService(id: any) {
    console.log('delete', id);
    this.dataProvider.pageSetting.blur = true;
    this.databaseService
      .deleteService(id)
      .then(() => {
        this.alertify.presentToast('Service Deleted Successfully');
        this.ngOnInit();
      })
      .catch((err) => {
        this.alertify.presentToast('Service Deleted Successfully', 'error');
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }

  deleteCategory(id: any) {
    console.log('delete', id);
    this.dataProvider.pageSetting.blur = true;
    this.databaseService
      .deleteCategory(id)
      .then(() => {
        this.alertify.presentToast('Category Deleted Successfully');
        this.ngOnInit();
      })
      .catch((err) => {
        this.alertify.presentToast('Category Deleted Successfully', 'error');
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }

  toTitleCase(str:string) {
    return str.replace(
      /\w\S*/g,
      function(txt:string) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
}
