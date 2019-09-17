import { Component, OnInit } from '@angular/core';
import { ClubeService } from './clube.service';
import { Clube } from './clube';

@Component({
  selector: 'app-clube',
  templateUrl: './clube.component.html',
  styleUrls: ['./clube.component.css']
})
export class ClubeComponent implements OnInit 
{
  clubes: Clube[] = [];

  constructor(private clubeService: ClubeService) { }

  ngOnInit() 
  {
    this.clubes = this.clubeService.getClubes();
  }

}
