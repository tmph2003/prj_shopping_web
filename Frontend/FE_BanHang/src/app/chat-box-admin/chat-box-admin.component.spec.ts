import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxAdminComponent } from './chat-box-admin.component';

describe('ChatBoxAdminComponent', () => {
  let component: ChatBoxAdminComponent;
  let fixture: ComponentFixture<ChatBoxAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBoxAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBoxAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
