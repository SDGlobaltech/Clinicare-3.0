import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPushNotificationComponent } from './show-push-notification.component';

describe('ShowPushNotificationComponent', () => {
  let component: ShowPushNotificationComponent;
  let fixture: ComponentFixture<ShowPushNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPushNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPushNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
