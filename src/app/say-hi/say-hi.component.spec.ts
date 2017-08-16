import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SayHiComponent } from './say-hi.component';

describe('SayHiComponent', () => {
  let component: SayHiComponent;
  let fixture: ComponentFixture<SayHiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SayHiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SayHiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
