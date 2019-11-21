import { Component, OnInit } from '@angular/core';
import { Arbitro } from '../models/arbitro';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  arbitroLogado: Arbitro = new Arbitro();

  constructor(private router: Router, private loginService: LoginService) {
   }

  ngOnInit() 
  { 
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.arbitroLogado = mostrar
    );
  }


  onClickSair()
  {
    this.arbitroLogado = new Arbitro();
    this.router.navigate(['']);
    this.loginService.deslogarArbitro();
  }

}
