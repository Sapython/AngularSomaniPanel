import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor() { }

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
