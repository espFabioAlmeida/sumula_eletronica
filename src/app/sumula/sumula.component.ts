import { Component, OnInit } from '@angular/core';
import { SumulaService } from './sumula.service';
import { Sumula } from '../models/sumula'

@Component({
  selector: 'app-sumula',
  templateUrl: './sumula.component.html',
  styleUrls: ['./sumula.component.css']
})
export class SumulaComponent implements OnInit {

  sumulas: Sumula[] = [];

  constructor(private sumulaService: SumulaService) { }

  ngOnInit() 
  {
    this.getSumulas();
  }

  getSumulas()
  {
    this.sumulaService.getSumulas().subscribe(dados =>
      {
        this.sumulas = dados;

        console.log("Sumulas")
        console.log(this.sumulas);
      })
    //this.sumulas = this.sumulaService.getSumulas();
  }

  mascaraDataHora(data: Date)
  {
    const toString: String = data.toString();

    return toString.substring(8,10) + "/" + toString.substring(5,7) + "/" + toString.substring(0,4) +
      " - " + toString.substring(11,13) + ":" + toString.substring(14,16);
  }

}
