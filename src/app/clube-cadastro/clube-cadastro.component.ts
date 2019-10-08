import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClubeService } from '../clube/clube.service';
import { Clube } from '../clube/clube';
import { CepService } from '../clube/cep.service';
import { Cep } from '../clube/cep';
import { concat } from 'rxjs';

@Component({
  selector: 'app-clube-cadastro',
  templateUrl: './clube-cadastro.component.html',
  styleUrls: ['./clube-cadastro.component.css']
})
export class ClubeCadastroComponent implements OnInit 
{
  clube: Clube = new Clube();
  endereco: Cep = new Cep();

  constructor(private route: ActivatedRoute, private clubeService: ClubeService, 
    private router: Router, private cepService: CepService ) { }

  ngOnInit() 
  {
    this.getClube();
    this.verificaCep();
    //Teste de cep service
    //this.cepService.cunsultaCep("89053-145").subscribe(dados => console.log(dados));   
  }

  onSubmit(formulario: NgForm)
  {
    if(formulario.valid)
    {
      this.clube.cidade = this.endereco.localidade + "/" + this.endereco.uf;
      console.log("Recebido no Submit");
      console.log(this.clube);
      this.clubeService.cadastraClube(this.clube);
      this.clube = new Clube();

      this.router.navigate(['/clube']);
    }
  }

  getClube()
  {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Id recebido:");
    console.log(id);

    if(id != null)
    {
      console.log("Nao eh nulo");
      this.clube = this.clubeService.getClubeById(id);
      return;
    }
    console.log("Eh nulo");
  }

  verificaCep()
  {
    this.endereco = new Cep();
    if(this.clube.cep != null) //Verifica se tem algo escrito
    {
      this.clube.cep = this.clube.cep.replace(/\D/g, ''); //Remove qualquer caracter que não seja dígito
      if(this.clube.cep.length == 8) //Verifica se tem 8 letras
      {
        this.cepService.cunsultaCep(this.clube.cep).subscribe(dados => this.endereco = dados); 
        return;
      }
    }
  }

}
