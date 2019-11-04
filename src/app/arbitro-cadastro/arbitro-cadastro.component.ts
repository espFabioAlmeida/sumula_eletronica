import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ArbitroService } from '../arbitro/arbitro.service';
import { Arbitro } from '../arbitro/arbitro';
import { ArbitroCategoria } from '../arbitro/arbitroCategoria';

@Component({
  selector: 'app-arbitro-cadastro',
  templateUrl: './arbitro-cadastro.component.html',
  styleUrls: ['./arbitro-cadastro.component.css']
})
export class ArbitroCadastroComponent implements OnInit {
  arbitro: Arbitro = new Arbitro();
  categorias: ArbitroCategoria[] = [];
  formulario: FormGroup;

  constructor(private route: ActivatedRoute, private arbitroService: ArbitroService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    this.categorias = this.arbitroService.getCategorias();
    this.getArbitro();
  } 

  onSubmit()
  {
    if(this.formulario.valid)
    {
      console.log("recebido no Submit");
      console.log(this.formulario.value);

      this.setArbitro();

      this.arbitroService.cadastraArbitro(this.arbitro);
      this.reiniciaArbitro();

      this.router.navigate(['/arbitro']);
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
      this.criarFormulario(); //Cria o formulário para depois sobrescrever
      this.arbitroService.getArbitros().subscribe(dados => 
        {
          const arbitros: Arbitro[] = dados;
  
          console.log("Arbitros recebidos do service")
          console.log(arbitros);

          this.arbitro = new Arbitro();
          this.arbitro = arbitros.find(arbitro => arbitro.id == id);

          this.arbitro.idCategoria = this.arbitroService.getIdCatergoriaByName(this.arbitro.categoria);         

          console.log("Arbitrs escolhido")
          console.log(this.arbitro);
          
          if(this.arbitro != null) 
          {
            this.criarFormulario();
            return;
          }

          this.reiniciaArbitro();
          this.criarFormulario();
        }
        );
    }
    else 
    {
      console.log("Eh nulo");
      this.reiniciaArbitro();
      this.criarFormulario();
    }  
  }

  setArbitro()
  {
    this.arbitro.altura = this.formulario.value.altura;
    this.arbitro.categoria = this.formulario.value.categoria;
    this.arbitro.cpf = this.formulario.value.cpf;
    this.arbitro.dataNascimento = this.formulario.value.dataNascimento;
    this.arbitro.funcao = this.formulario.value.funcao;
    this.arbitro.idCategoria = this.formulario.value.idCategoria;
    this.arbitro.nome = this.formulario.value.nome;
    this.arbitro.peso = this.formulario.value.peso;
    this.arbitro.senha = this.formulario.value.senha;
    this.arbitro.sexo = this.formulario.value.sexo;
    console.log(this.arbitro);
  }

  verificaCampo(campo)
  {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  reiniciaArbitro()
  {
    this.arbitro = new Arbitro();
    this.arbitro.idCategoria="1";
    this.arbitro.sexo="Masculino";
    this.arbitro.funcao="Arbitro";
    //this.setCampos();
  }

  criarFormulario()
  {
    this.formulario = this.formBuilder.group({
      nome: [this.arbitro.nome, [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)],],

      senha: [this.arbitro.senha,
        [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)]],

      cpf: [this.arbitro.cpf,
      [Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)]],

      dataNascimento: [this.arbitro.dataNascimento,
        Validators.required],

      altura: [this.arbitro.altura,
        Validators.required],

      peso: [this.arbitro.peso,
      Validators.required],

      sexo: [this.arbitro.sexo],
      idCategoria: [this.arbitro.idCategoria],
      funcao: [this.arbitro.funcao]
    })
  }

}
