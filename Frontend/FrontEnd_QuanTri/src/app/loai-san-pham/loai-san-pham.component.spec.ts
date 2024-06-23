import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiSanPhamComponent } from './loai-san-pham.component';

describe('LoaiSanPhamComponent', () => {
  let component: LoaiSanPhamComponent;
  let fixture: ComponentFixture<LoaiSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaiSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaiSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
