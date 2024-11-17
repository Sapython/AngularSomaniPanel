import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsaComponent } from './addsa.component';

describe('AddsaComponent', () => {
  let component: AddsaComponent;
  let fixture: ComponentFixture<AddsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
