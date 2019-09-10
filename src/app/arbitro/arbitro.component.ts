import { Component, OnInit } from '@angular/core';
import { ArbitroService } from './arbitro.service';
import { Arbitro } from './arbitro';

@Component({
  selector: 'app-arbitro',
  templateUrl: './arbitro.component.html',
  styleUrls: ['./arbitro.component.css']
})
export class ArbitroComponent implements OnInit {

  arbitros: Arbitro[] = [];

  constructor(private arbitroService: ArbitroService) { }

  ngOnInit() 
  {
    this.arbitros = this.arbitroService.getArbitros();
  }

}
