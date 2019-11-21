import { Component, OnInit } from '@angular/core';
import { ArbitroService } from './arbitro.service';
import { Arbitro } from '../models/arbitro';

@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent implements OnInit {

  arbitros: Arbitro[] = [];

  constructor(private arbitroService: ArbitroService) {}

  ngOnInit() 
  {
    this.getArbitros();
  }

  getArbitros()
  {
    this.arbitroService.getArbitros().subscribe(dados => 
    {
      this.arbitros = dados;
      console.log("Arbitros recebidos do service")
      console.log(this.arbitros);
    }
    );
  }

}
