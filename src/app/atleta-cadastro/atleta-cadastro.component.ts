import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AtletaService } from '../atleta/atleta.service';
import { Atleta } from '../atleta/atleta';

@Component({
  selector: 'app-atleta-cadastro',
  templateUrl: './atleta-cadastro.component.html',
  styleUrls: ['./atleta-cadastro.component.css']
})
export class AtletaCadastroComponent implements OnInit {
  atleta: Atleta = new Atleta();
  
  constructor(private route: ActivatedRoute, private atletaService: AtletaService,
    private router: Router) { }

  ngOnInit() 
  {
    this.getAtleta();
  }

  onSubmit(formulario: NgForm)
  {
    if(formulario.valid)
    {
      console.log("recebido no Submit");
      console.log(this.atleta);
      this.atletaService.cadastraAtleta(this.atleta);
      this.atleta = new Atleta();

      this.router.navigate(['/atleta']);
    }
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
  }

}
