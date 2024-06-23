import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoaiSanPhamComponent } from './add-loai-san-pham.component';

describe('AddLoaiSanPhamComponent', () => {
  let component: AddLoaiSanPhamComponent;
  let fixture: ComponentFixture<AddLoaiSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLoaiSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLoaiSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
