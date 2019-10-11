import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationListComponent } from './push-notification-list.component';

describe('PushNotificationListComponent', () => {
  let component: PushNotificationListComponent;
  let fixture: ComponentFixture<PushNotificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushNotificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
