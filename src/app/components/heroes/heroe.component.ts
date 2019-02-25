import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeInterface } from '../../interface/heroe.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeInterface = {
    nombre: '',
    bio: '',
    casa: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
