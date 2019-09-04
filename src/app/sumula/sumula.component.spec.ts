import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumulaComponent } from './sumula.component';

describe('SumulaComponent', () => {
  let component: SumulaComponent;
  let fixture: ComponentFixture<SumulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
