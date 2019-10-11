import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRemarkComponent } from './remark-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmRemarkComponent;
  let fixture: ComponentFixture<ConfirmRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
