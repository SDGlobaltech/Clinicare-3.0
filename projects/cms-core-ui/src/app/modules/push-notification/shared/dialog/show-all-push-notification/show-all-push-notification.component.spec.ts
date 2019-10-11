import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPushNotificationComponent } from './show-all-push-notification.component';

describe('ShowAllPushNotificationComponent', () => {
  let component: ShowAllPushNotificationComponent;
  let fixture: ComponentFixture<ShowAllPushNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllPushNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllPushNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
