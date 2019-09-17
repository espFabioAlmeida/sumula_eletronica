import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubeCadastroComponent } from './clube-cadastro.component';

describe('ClubeCadastroComponent', () => {
  let component: ClubeCadastroComponent;
  let fixture: ComponentFixture<ClubeCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubeCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
