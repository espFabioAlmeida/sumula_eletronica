import { Component, OnInit } from '@angular/core';
import { SumulaService } from './sumula.service';
import { Sumula } from './sumula'

@Component({
  selector: 'app-sumula',
  templateUrl: './sumula.component.html',
  styleUrls: ['./sumula.component.css']
})
export class SumulaComponent implements OnInit {

  sumulas: Sumula[] = [];

  constructor(private sumulaService: SumulaService) { }

  ngOnInit() {
  }

  getSumulas()
  {
    this.sumulas = this.sumulaService.getSumulas();
  }

}
