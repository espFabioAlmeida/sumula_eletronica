import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClubeService } from '../clube/clube.service';
import { Clube } from '../clube/clube';

@Component({
  selector: 'app-clube-cadastro',
  templateUrl: './clube-cadastro.component.html',
  styleUrls: ['./clube-cadastro.component.css']
})
export class ClubeCadastroComponent implements OnInit 
{
  clube: Clube = new Clube();

  constructor(private route: ActivatedRoute, private clubeService: ClubeService, 
    private router: Router) { }

  ngOnInit() 
  {
    this.getClube();
  }

  onSubmit(formulario: NgForm)
  {
    if(formulario.valid)
    {
      console.log("Recebido no Submit");
      console.log(this.clube);
      this.clubeService.cadastraClube(this.clube);
      this.clube = new Clube();
      this.clube.estado = "SC";

      //this.router.navigate(['/clube']);
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
    this.clube.estado = "SC";
  }

}
