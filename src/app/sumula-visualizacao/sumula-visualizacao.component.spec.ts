import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumulaVisualizacaoComponent } from './sumula-visualizacao.component';

describe('SumulaVisualizacaoComponent', () => {
  let component: SumulaVisualizacaoComponent;
  let fixture: ComponentFixture<SumulaVisualizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumulaVisualizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumulaVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
