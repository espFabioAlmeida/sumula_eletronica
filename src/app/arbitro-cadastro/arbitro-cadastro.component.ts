import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArbitroService } from '../arbitro/arbitro.service';
import { Arbitro } from '../arbitro/arbitro';

@Component({
  selector: 'app-arbitro-cadastro',
  templateUrl: './arbitro-cadastro.component.html',
  styleUrls: ['./arbitro-cadastro.component.css']
})
export class ArbitroCadastroComponent implements OnInit {
  arbitro: Arbitro = new Arbitro();

  constructor(private route: ActivatedRoute, private arbitroService: ArbitroService) { }

  ngOnInit() 
  {
    this.getArbitro();
  }

  getArbitro()
  {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Id recebido: ");
    console.log(id);
    if(id != null)
    {
      console.log("Nao eh nulo");
      this.arbitro = this.arbitroService.getArbitroById(id);
    }
    else console.log("Eh nulo");
    
  }

}
