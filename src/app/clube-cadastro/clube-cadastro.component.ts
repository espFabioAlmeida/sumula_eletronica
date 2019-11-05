import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClubeService } from '../clube/clube.service';
import { Clube } from '../clube/clube';
import { CepService } from '../clube/cep.service';
import { Cep } from '../clube/cep';

@Component({
  selector: 'app-clube-cadastro',
  templateUrl: './clube-cadastro.component.html',
  styleUrls: ['./clube-cadastro.component.css']
})
export class ClubeCadastroComponent implements OnInit 
{
  clube: Clube = new Clube();
  endereco: Cep = new Cep();
  formulario: FormGroup;

  constructor(private route: ActivatedRoute, private clubeService: ClubeService, 
    private router: Router, private cepService: CepService, private formBuilder: FormBuilder ) { }

  ngOnInit() 
  {
    this.getClube();
    //Teste de cep service
    //this.cepService.cunsultaCep("89053-145").subscribe(dados => console.log(dados));   
  }

  onSubmit()
  {
    if(this.formulario.valid)
    {     
      console.log("Recebido no Submit");
      console.log(this.formulario.value);
      this.setClube();

      this.clube.cidade = this.endereco.localidade + "/" + this.endereco.uf;
      this.clubeService.cadastraClube(this.clube);
      this.clube = new Clube();

      this.router.navigate(['/clube']);
    }
  }

  setClube()
  {
    this.clube.nome = this.formulario.value.nome;
    this.clube.dataFundacao = this.formulario.value.dataFundacao;
    this.clube.estadio = this.formulario.value.estadio;
    this.clube.cep = this.formulario.value.cep;
    console.log(this.clube);
  }

  getClube()
  {
    const id = this.route.snapshot.paramMap.get('id');   
    console.log("Id recebido:");
    console.log(id);

    if(id != null)
    {
      this.criarFormulario();
      console.log("Nao eh nulo");
      this.clubeService.getClubeById(id).subscribe(dados =>
        {
          this.clube = dados;

          console.log("Clube Escolhido")
          console.log(this.clube);

          if(this.clube != null)
          {
            this.criarFormulario();
            this.verificaCep();
            return;           
          }

          this.clube = new Clube();
          this.criarFormulario();
        })
    }
    else
    {
      console.log("Eh nulo");
      this.clube = new Clube();
      this.criarFormulario();
    }
  }

  verificaCep()
  {
    this.endereco = new Cep();
    if(this.formulario.value.cep != null) //Verifica se tem algo escrito
    {
      this.formulario.value.cep = this.formulario.value.cep.replace(/\D/g, ''); //Remove qualquer caracter que não seja dígito
      if(this.formulario.value.cep.length == 8) //Verifica se tem 8 letras
      {
        this.cepService.cunsultaCep(this.formulario.value.cep).subscribe(dados => this.endereco = dados); 
        return;
      }
    }
  }

  verificaCampo(campo)
  {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  cepEncontrado()
  {
    return !this.endereco.logradouro && this.formulario.get('cep').dirty;
  }

  criarFormulario()
  {
    this.formulario = this.formBuilder.group(
      {
        nome: [this.clube.nome, [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)]],

        dataFundacao: [this.clube.dataFundacao,
          Validators.required],
        
        estadio: [this.clube.estadio, [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)]],
        
        cep: [this.clube.cep, [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)]],
      }
    )
  }

}
