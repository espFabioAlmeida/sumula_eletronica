import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtletaCadastroComponent } from './atleta-cadastro.component';

describe('AtletaCadastroComponent', () => {
  let component: AtletaCadastroComponent;
  let fixture: ComponentFixture<AtletaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtletaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtletaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
