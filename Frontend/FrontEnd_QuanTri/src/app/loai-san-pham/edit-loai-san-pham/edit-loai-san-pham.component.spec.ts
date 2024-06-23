import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoaiSanPhamComponent } from './edit-loai-san-pham.component';

describe('EditLoaiSanPhamComponent', () => {
  let component: EditLoaiSanPhamComponent;
  let fixture: ComponentFixture<EditLoaiSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLoaiSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLoaiSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
