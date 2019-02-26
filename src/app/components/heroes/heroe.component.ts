import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroeInterface } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeInterface = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  constructor(private _heroesService: HeroesService,
              private _router: Router) { }

  ngOnInit() {
  }

  guardar() {
    console.log(this.heroe);
    this._heroesService.nuevoHeroe(this.heroe)
      .subscribe(data => {
        this._router.navigate(['/heroe', data.name]); //name es el nombre que recibe los datos en firebase
      },error1 => console.error(error1));
  }

}
