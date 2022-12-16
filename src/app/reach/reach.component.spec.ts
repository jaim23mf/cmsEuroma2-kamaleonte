import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachComponent } from './reach.component';

describe('ReachComponent', () => {
  let component: ReachComponent;
  let fixture: ComponentFixture<ReachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
