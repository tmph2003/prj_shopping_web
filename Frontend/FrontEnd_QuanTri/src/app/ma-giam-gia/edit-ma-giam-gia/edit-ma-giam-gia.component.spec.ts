import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaGiamGiaComponent } from './edit-ma-giam-gia.component';

describe('EditMaGiamGiaComponent', () => {
  let component: EditMaGiamGiaComponent;
  let fixture: ComponentFixture<EditMaGiamGiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMaGiamGiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMaGiamGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
