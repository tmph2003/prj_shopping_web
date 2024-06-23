import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaGiamGiaComponent } from './ma-giam-gia.component';

describe('MaGiamGiaComponent', () => {
  let component: MaGiamGiaComponent;
  let fixture: ComponentFixture<MaGiamGiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaGiamGiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaGiamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
