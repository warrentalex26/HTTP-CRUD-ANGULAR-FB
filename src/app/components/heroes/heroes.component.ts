import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service"
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading: boolean = true;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getTodosHeroes()
      .subscribe(data =>{
        //Viene un objeto dentro de otro objeto por ende no se puede barrer con un for
        this.heroes = data;
        this.loading = false


        //convertimos el objeto en un arreglo
        // for (let $keys in data){
        //   console.log(data[$keys]);
          //separamos los datos cada uno en un espacio en el arr
          // this.heroes.push(data[$keys]);
        // }
      })
  }

  ngOnInit() {
  }

  borrarHeroe(key$:string){
    this._heroesService.borrarHeroe(key$)
      .subscribe(data => {
        //Por si pasa un error
        if (data) {
        console.error(data);
        }else {
          //SALIO BIEN
          //Eliminamos la posicion del arreglo, no lo hacemos con splice porque es objeto el que tiene.
          delete this.heroes[key$];
        }
      });
  }

}
