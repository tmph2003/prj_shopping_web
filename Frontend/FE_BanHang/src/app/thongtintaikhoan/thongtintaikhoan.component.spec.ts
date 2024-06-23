import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtintaikhoanComponent } from './thongtintaikhoan.component';

describe('ThongtintaikhoanComponent', () => {
  let component: ThongtintaikhoanComponent;
  let fixture: ComponentFixture<ThongtintaikhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongtintaikhoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThongtintaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
