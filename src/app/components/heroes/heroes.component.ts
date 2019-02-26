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

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getTodosHeroes()
      .subscribe(data =>{
        //Viene un objeto dentro de otro objeto por ende no se puede barrer con un for
        console.log(data);
        this.heroes = data;


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

}
