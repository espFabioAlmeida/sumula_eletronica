import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArbitroService } from '../arbitro/arbitro.service';
import { Arbitro } from '../arbitro/arbitro';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  onSubmit(formulario: NgForm)
  {
    if(formulario.valid)
    {
      console.log("recebido no Submit");
      console.log(this.arbitro);
      this.arbitro.id = Math.random().toString(36).substring(2,15) +
      Math.random().toString(36).substring(2,15);
      this.arbitroService.cadastraArbitro(this.arbitro);
      this.arbitro = new Arbitro();
      this.arbitro.categoria="LVND";
      this.arbitro.sexo="Masculino";
      this.arbitro.funcao="Arbitro";
    }
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
    else 
    {
      console.log("Eh nulo");
      this.arbitro.categoria="LVND";
      this.arbitro.sexo="Masculino";
      this.arbitro.funcao="Arbitro";
    }  
  }



}
