import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, Validators } from '@angular/forms';
import { ArbitroService } from '../arbitro/arbitro.service';
import { Arbitro } from '../arbitro/arbitro';

@Component({
  selector: 'app-arbitro-cadastro',
  templateUrl: './arbitro-cadastro.component.html',
  styleUrls: ['./arbitro-cadastro.component.css']
})
export class ArbitroCadastroComponent implements OnInit {
  arbitro: Arbitro = new Arbitro();

  constructor(private route: ActivatedRoute, private arbitroService: ArbitroService,
    private router: Router) { }

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

      //Validação de dados
      if(this.arbitro.cpf.length != 11 || this.arbitro.senha.length < 4
        || this.arbitro.senha.length > 10)
      {
        alert("Há campos com erros.");
        
        return;
      }

      this.arbitroService.cadastraArbitro(this.arbitro);
      this.arbitro = new Arbitro();
      this.arbitro.categoria="LVND";
      this.arbitro.sexo="Masculino";
      this.arbitro.funcao="Arbitro";

      this.router.navigate(['/arbitro']);

      return;
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
