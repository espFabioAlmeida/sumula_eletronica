import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AtletaService } from '../atleta/atleta.service';
import { Atleta } from '../atleta/atleta';
import { ClubeService } from '../clube/clube.service';
import { Clube } from '../clube/clube';

@Component({
  selector: 'app-atleta-cadastro',
  templateUrl: './atleta-cadastro.component.html',
  styleUrls: ['./atleta-cadastro.component.css']
})
export class AtletaCadastroComponent implements OnInit {
  atleta: Atleta = new Atleta();
  clubes: Clube[] = [];
  formulario: FormGroup;
  
  constructor(private route: ActivatedRoute, private atletaService: AtletaService,
    private clubeService: ClubeService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    this.getAtleta();
    this.getClubes();

    this.formulario = this.formBuilder.group(
    {
      nome: [this.atleta.nome, [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]],

      cpf: [this.atleta.cpf,
        [Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)]],
  
      dataNascimento: [this.atleta.dataNascimento,
        Validators.required],
      
      bid: [this.atleta.bid],
      idClube: [this.atleta.idClube]
    })
  }

  onSubmit()
  {
    if(this.formulario.valid)
    {
      console.log("recebido no Submit");
      console.log(this.formulario.value);
      this.setAtleta();

      if(this.atleta.idClube != "null")
      {
        this.atleta.clube = this.clubes.find(clube => clube.id == this.atleta.idClube).nome;
      }  

      this.atletaService.cadastraAtleta(this.atleta);
      this.atleta = new Atleta();
      this.atleta.clube = "Sem Clube";
      this.atleta.idClube = "null";

      this.router.navigate(['/atleta']);
    }
  }

  setAtleta()
  {
    this.atleta.nome = this.formulario.value.nome;
    this.atleta.cpf = this.formulario.value.cpf;
    this.atleta.dataNascimento = this.formulario.value.dataNascimento;
    this.atleta.bid = this.formulario.value.bid;
    if(this.formulario.value.idClube == null) this.atleta.idClube = "" + this.formulario.value.idClube;
    else this.atleta.idClube = this.formulario.value.idClube;  
    console.log(this.atleta);
  }


  getAtleta()
  {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Id recebido: ");
    console.log(id);

    if(id != null)
    {
      console.log("Nao eh nulo");
      this.atleta = this.atletaService.getAtletaById(id);
      return;
    }

    console.log("Eh nulo");
    this.atleta.clube = "Sem Clube";
    this.atleta.idClube = "null";
  }

  getClubes()
  {
    this.clubes = this.clubeService.getClubes();
  }

  verificaCampo(campo)
  {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

}
