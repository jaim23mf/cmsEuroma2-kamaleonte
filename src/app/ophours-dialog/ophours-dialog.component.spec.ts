import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OphoursDialogComponent } from './ophours-dialog.component';

describe('OphoursDialogComponent', () => {
  let component: OphoursDialogComponent;
  let fixture: ComponentFixture<OphoursDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OphoursDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OphoursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
