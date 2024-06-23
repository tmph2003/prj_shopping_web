import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSanPhamComponent } from './add-san-pham.component';

describe('AddSanPhamComponent', () => {
  let component: AddSanPhamComponent;
  let fixture: ComponentFixture<AddSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
