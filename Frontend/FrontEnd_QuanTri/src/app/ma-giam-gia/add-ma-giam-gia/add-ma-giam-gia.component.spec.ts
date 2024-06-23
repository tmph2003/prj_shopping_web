import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaGiamGiaComponent } from './add-ma-giam-gia.component';

describe('AddMaGiamGiaComponent', () => {
  let component: AddMaGiamGiaComponent;
  let fixture: ComponentFixture<AddMaGiamGiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMaGiamGiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMaGiamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
