import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnhSanPhamComponent } from './edit-anh-san-pham.component';

describe('EditAnhSanPhamComponent', () => {
  let component: EditAnhSanPhamComponent;
  let fixture: ComponentFixture<EditAnhSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAnhSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAnhSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
