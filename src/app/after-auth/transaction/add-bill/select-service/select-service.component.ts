import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import Fuse from 'fuse.js';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss'],
})
export class SelectServiceComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef | undefined;
  @Output() close: EventEmitter<any> = new EventEmitter();
  services: any[] = [];
  filteredServices: any[] = [];
  categories: any[] = [];
  selectedServices: any[] = [];
  fuseSearch: any;
  searchTerm: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataProvider: DataProvider
  ) {}

  ngOnInit(): void {
    this.services = this.data.services;
    const options = {
      includeScore: true,
      keys: ['name', 'price', 'category.name'],
    };
    this.fuseSearch = new Fuse(this.services, options);
  }

  setValue(event: any, index: number, id: string) {
    console.log(event);
    if (event.checked || event._checked) {
      this.selectedServices.push(id);
    } else {
      this.selectedServices.splice(this.selectedServices.indexOf(id), 1);
    }
    console.log(this.selectedServices);
  }
  submit() {
    let services: any[] = [];
    // filter the services from this.selectedServices
    this.selectedServices.forEach((id) => {
      services.push(this.data.services.find((service:any) => service.id == id));
    });
    this.close.emit(services);
  }

  search(value: string) {
    this.searchTerm = value;
    const result = this.fuseSearch.search(value);
    console.log(result);
    this.services = result.map((item: any) => item.item);
  }

  workerSearch(value: string) {
    this.searchTerm = value;
  }

  ngAfterViewInit(): void {
    if (this.input) {
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          filter(Boolean),
          debounceTime(500),
          distinctUntilChanged(),
          tap((text) => {
            // console.log(this.input?.nativeElement.value)
            this.search(this.input?.nativeElement.value);
          })
        )
        .subscribe();
    }
  }
}
