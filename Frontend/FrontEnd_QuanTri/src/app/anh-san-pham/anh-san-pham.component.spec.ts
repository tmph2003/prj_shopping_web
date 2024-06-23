import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnhSanPhamComponent } from './anh-san-pham.component';

describe('AnhSanPhamComponent', () => {
  let component: AnhSanPhamComponent;
  let fixture: ComponentFixture<AnhSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnhSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnhSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
