import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitroCadastroComponent } from './arbitro-cadastro.component';

describe('ArbitroCadastroComponent', () => {
  let component: ArbitroCadastroComponent;
  let fixture: ComponentFixture<ArbitroCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbitroCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbitroCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
