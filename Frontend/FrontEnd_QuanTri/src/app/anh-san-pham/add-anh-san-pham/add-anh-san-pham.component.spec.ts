import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnhSanPhamComponent } from './add-anh-san-pham.component';

describe('AddAnhSanPhamComponent', () => {
  let component: AddAnhSanPhamComponent;
  let fixture: ComponentFixture<AddAnhSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnhSanPhamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAnhSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
