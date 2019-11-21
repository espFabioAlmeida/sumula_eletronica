import { Component, OnInit } from '@angular/core';
import { Atleta } from '../models/atleta';
import { AtletaService } from '../services/atleta.service';

@Component({
  selector: 'app-atleta',
  templateUrl: './atleta.component.html',
  styleUrls: ['./atleta.component.css']
})
export class AtletaComponent implements OnInit {

  atletas: Atleta[] = [];
  constructor(private atletaService: AtletaService) { }

  ngOnInit() 
  {
    this.getAtletas();
  }

  getAtletas()
  {
    this.atletaService.getAtletas().subscribe(dados =>
      {
        this.atletas = dados;
        console.log("Atletas recebidos do service")
        console.log(this.atletas);
      })
  }

}
