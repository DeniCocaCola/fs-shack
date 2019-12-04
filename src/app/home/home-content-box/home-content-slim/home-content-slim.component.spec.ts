import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentSlimComponent } from './home-content-slim.component';

describe('HomeContentSlimComponent', () => {
  let component: HomeContentSlimComponent;
  let fixture: ComponentFixture<HomeContentSlimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContentSlimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentSlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
