import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDynamicDialogComponent } from './info-dynamic-dialog.component';

describe('InfoDynamicDialogComponent', () => {
  let component: InfoDynamicDialogComponent;
  let fixture: ComponentFixture<InfoDynamicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDynamicDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
