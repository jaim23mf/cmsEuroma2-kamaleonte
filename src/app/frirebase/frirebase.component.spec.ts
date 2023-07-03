import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrirebaseComponent } from './frirebase.component';

describe('FrirebaseComponent', () => {
  let component: FrirebaseComponent;
  let fixture: ComponentFixture<FrirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrirebaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
