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
    this.loginService.mostrarMenuEmitter.subscribe(mostrar =>{
      
      if(mostrar != null) this.arbitroLogado = mostrar;
      else this.arbitroLogado = new Arbitro();
    });
  }


  onClickSair()
  {      
    this.loginService.cancelarToken().subscribe(dados => {      
      localStorage.removeItem('currentUser'); 
      this.loginService.deslogarArbitro();
      this.arbitroLogado = new Arbitro(); 
      this.router.navigate(['/login']);
    });
  }

}
