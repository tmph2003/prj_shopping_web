import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagiamgiaComponent } from './magiamgia.component';

describe('MagiamgiaComponent', () => {
  let component: MagiamgiaComponent;
  let fixture: ComponentFixture<MagiamgiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagiamgiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagiamgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
