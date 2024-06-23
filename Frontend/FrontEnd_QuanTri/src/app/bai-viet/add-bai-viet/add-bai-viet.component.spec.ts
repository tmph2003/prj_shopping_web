import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaiVietComponent } from './add-bai-viet.component';

describe('AddBaiVietComponent', () => {
  let component: AddBaiVietComponent;
  let fixture: ComponentFixture<AddBaiVietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBaiVietComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBaiVietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
