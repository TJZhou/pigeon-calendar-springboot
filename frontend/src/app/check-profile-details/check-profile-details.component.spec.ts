import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckProfileDetailsComponent } from './check-profile-details.component';

describe('CheckProfileDetailsComponent', () => {
  let component: CheckProfileDetailsComponent;
  let fixture: ComponentFixture<CheckProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
