import { Component, OnInit } from '@angular/core';
import { ClubeService } from './clube.service';
import { CepService } from './cep.service';
import { Cep } from './cep';
import { Clube } from './clube';

@Component({
  selector: 'app-clube',
  templateUrl: './clube.component.html',
  styleUrls: ['./clube.component.css']
})
export class ClubeComponent implements OnInit 
{
  clubes: Clube[] = [];
  cep: Cep = new Cep();

  //constructor(private clubeService: ClubeService, private cepService: CepService ) { }

  constructor(private clubeService: ClubeService) { }

  ngOnInit() 
  {
    this.clubes = this.clubeService.getClubes();

    //this.cepService.buscaCep();

    
    
    /*
    this.clubes.forEach(clube => 
    {
      console.log("Busca Cep:");  
    });
    */
  
  }

}
