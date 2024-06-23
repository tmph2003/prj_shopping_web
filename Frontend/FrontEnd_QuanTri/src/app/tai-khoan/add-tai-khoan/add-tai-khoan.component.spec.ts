import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaiKhoanComponent } from './add-tai-khoan.component';

describe('AddTaiKhoanComponent', () => {
  let component: AddTaiKhoanComponent;
  let fixture: ComponentFixture<AddTaiKhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaiKhoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTaiKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
