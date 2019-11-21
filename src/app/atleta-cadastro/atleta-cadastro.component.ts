import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AtletaService } from '../atleta/atleta.service';
import { Atleta } from '../models/atleta';
import { ClubeService } from '../clube/clube.service';
import { Clube } from '../models/clube';

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
    this.criarFormulario();
    this.getClubes();    
  }

  onSubmit()
  {
    if(this.formulario.valid)
    {
      console.log("recebido no Submit");
      console.log(this.formulario.value);
      this.setAtleta();

      if(this.atleta.idClube != "null" && this.atleta.idClube != "0")
      {
        this.atleta.clube = this.clubes.find(clube => clube.id == this.atleta.idClube).nome;
      }  
      
      if(this.atleta.id == null)
      {
        this.atletaService.cadastraAtleta(this.atleta).subscribe(dados =>
        {
          alert("Atleta Cadastrado com Sucesso");
          this.reiniciaAtleta();
          this.router.navigate(['/atleta']);
        })        
      }
      else
      {
        this.atletaService.atualizaAtleta(this.atleta).subscribe(dados =>
        {
          alert("Atleta Atualizado com Sucesso");
          this.reiniciaAtleta();
          this.router.navigate(['/atleta']);
        }) 
      }
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
      
      this.atletaService.getAtletaById(id).subscribe(dados =>
        {
          this.atleta = dados;

          console.log("Atleta Escolhido")
          console.log(this.atleta);

          if(this.atleta != null)
          {
            this.criarFormulario();
            return;           
          }

          this.reiniciaAtleta();
          this.criarFormulario();
        })
    }

    console.log("Eh nulo");
    this.reiniciaAtleta();
    this.criarFormulario();
  }

  getClubes()
  {
    this.clubeService.getClubes().subscribe(dados =>
      {
        this.clubes = dados;
        console.log("Clubes recebidos do service")
        console.log(this.clubes);
        this.getAtleta();
      })
  }

  verificaCampo(campo)
  {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  reiniciaAtleta()
  {
    this.atleta = new Atleta();
    this.atleta = new Atleta();
    this.atleta.clube = "Sem Clube";
    this.atleta.idClube = "0";
  }

  criarFormulario()
  {
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

}
