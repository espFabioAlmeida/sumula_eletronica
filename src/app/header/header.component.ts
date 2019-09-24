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

  constructor(private router: Router) { }

  ngOnInit() { }

  setArbitroLogado(arbitro: Arbitro)
  {
    this.arbitroLogado = arbitro;
  }

  onClickSair()
  {
    this.arbitroLogado = new Arbitro();
    this.router.navigate(['']);
  }

}
