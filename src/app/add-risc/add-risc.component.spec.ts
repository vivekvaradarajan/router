import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRiscComponent } from './add-risc.component';

describe('AddRiscComponent', () => {
  let component: AddRiscComponent;
  let fixture: ComponentFixture<AddRiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
