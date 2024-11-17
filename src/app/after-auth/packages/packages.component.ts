import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AddPackageComponent } from './add-package/add-package.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packages:any[] = []
  constructor(private dialog:Dialog,private databaseService:DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getPackages().then((packages)=>{
      this.packages = []
      packages.forEach((data)=>{
        this.packages.push({...data.data(),id:data.id})
      })
    })
  }
  addPackage(){
    const dialog = this.dialog.open(AddPackageComponent);

  }

}
