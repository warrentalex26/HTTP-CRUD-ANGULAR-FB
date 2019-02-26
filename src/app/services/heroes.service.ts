import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HeroeInterface } from '../interface/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable()

export class HeroesService {

  fireAPI_URL: string = 'https://heroesapp-e4dfc.firebaseio.com/heroes.json';

  constructor(private http: HttpClient) {

  }

  nuevoHeroe(heroe: HeroeInterface) {

    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    return this.http.post( this.fireAPI_URL, body, {headers} )
      .pipe(map(res => {
        console.log(res);
        return res;
      }));

  }
}
