import { Component, OnInit } from '@angular/core';
import { ClubeService } from './clube.service';
import { CepService } from './cep.service';
import { Cep } from '../models/cep';
import { Clube } from '../models/clube';

@Component({
  selector: 'app-clube',
  templateUrl: './clube.component.html',
  styleUrls: ['./clube.component.css']
})
export class ClubeComponent implements OnInit 
{
  clubes: Clube[] = [];
  cep: Cep = new Cep();

  constructor(private clubeService: ClubeService) { }

  ngOnInit() 
  {
    this.getClubes();
  }

  getClubes()
  {
    this.clubeService.getClubes().subscribe(dados =>
      {
        this.clubes = dados;
        console.log("Clubes recebidos do service")
        console.log(this.clubes);
      })
  }

}
