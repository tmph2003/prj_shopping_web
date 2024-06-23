import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxAdminListUserComponent } from './chat-box-admin-list-user.component';

describe('ChatBoxAdminListUserComponent', () => {
  let component: ChatBoxAdminListUserComponent;
  let fixture: ComponentFixture<ChatBoxAdminListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBoxAdminListUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBoxAdminListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
