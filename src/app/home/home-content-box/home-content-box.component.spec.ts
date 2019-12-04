import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeContentBoxComponent } from './home-content-box.component';

describe('HomeContentBoxComponent', () => {
  let component: HomeContentBoxComponent;
  let fixture: ComponentFixture<HomeContentBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContentBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
