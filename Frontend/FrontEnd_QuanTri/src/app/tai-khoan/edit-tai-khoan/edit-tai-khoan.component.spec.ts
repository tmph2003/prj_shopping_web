import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaiKhoanComponent } from './edit-tai-khoan.component';

describe('EditTaiKhoanComponent', () => {
  let component: EditTaiKhoanComponent;
  let fixture: ComponentFixture<EditTaiKhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaiKhoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTaiKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
