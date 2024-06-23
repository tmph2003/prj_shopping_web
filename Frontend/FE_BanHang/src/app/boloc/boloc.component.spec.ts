import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolocComponent } from './boloc.component';

describe('BolocComponent', () => {
  let component: BolocComponent;
  let fixture: ComponentFixture<BolocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BolocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BolocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
