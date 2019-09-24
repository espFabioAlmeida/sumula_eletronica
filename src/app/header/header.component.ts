import { Component, OnInit } from '@angular/core';
import { Arbitro } from '../arbitro/arbitro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  arbitroLogado: Arbitro = new Arbitro();
  mostrarBarra: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit() { }

  setArbitroLogado(arbitro: Arbitro)
  {
    this.arbitroLogado = arbitro;
    this.mostrarBarra = true;
  }

  getArbitroLogado()
  {
    return this.arbitroLogado;
  }

  onClickSair()
  {
    this.arbitroLogado = new Arbitro();
    this.router.navigate(['']);
    this.mostrarBarra = false;
  }

}
