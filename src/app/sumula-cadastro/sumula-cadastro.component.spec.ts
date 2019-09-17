import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumulaCadastroComponent } from './sumula-cadastro.component';

describe('SumulaCadastroComponent', () => {
  let component: SumulaCadastroComponent;
  let fixture: ComponentFixture<SumulaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumulaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumulaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
