import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmessageComponent } from './addmessage.component';

describe('AddmessageComponent', () => {
  let component: AddmessageComponent;
  let fixture: ComponentFixture<AddmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
