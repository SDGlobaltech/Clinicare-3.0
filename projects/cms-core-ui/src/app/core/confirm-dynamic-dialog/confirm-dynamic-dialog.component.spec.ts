import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDynamicDialogComponent } from './confirm-dynamic-dialog.component';

describe('ConfirmDynamicDialogComponent', () => {
  let component: ConfirmDynamicDialogComponent;
  let fixture: ComponentFixture<ConfirmDynamicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDynamicDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
