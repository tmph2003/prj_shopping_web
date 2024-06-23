import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSanPhamComponent } from './edit-san-pham.component';

describe('EditSanPhamComponent', () => {
  let component: EditSanPhamComponent;
  let fixture: ComponentFixture<EditSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
