import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HeroeInterface } from '../interface/heroe.interface';
import { map } from 'rxjs/operators';

@Injectable()

export class HeroesService {

  //Le decimos a Angular que este es el URL que se necesita usar para hacer el CRUD
  fireAPI_URL: string = 'https://heroesapp-e4dfc.firebaseio.com/heroes.json';
  heroe_URL: string = 'https://heroesapp-e4dfc.firebaseio.com/heroes';

  //Inyectamos en el constructor el HttpClient para usarlo en el servicio
  constructor(private http: HttpClient) {

  }

  //Creamos el nuevo Heroe, recibe el heroe de tipo heroe para que no recibimos datos que no son los esperados
  nuevoHeroe(heroe: HeroeInterface) {

    //Body es ingual a JSON.Stringify para que cree un JSON con un string completamente VALIDO que usa Firebase
    let body = JSON.stringify(heroe);
    //Definimos el encabezado de la petición
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //Necesitamos que regrese un observable que nos diga si se inserto o no, para eso el http.post lo regresa.
    return this.http.post( this.fireAPI_URL, body, {headers} )
      //map nos ayuda a trasnformar la data que viene
      .pipe(map(res => {
        console.log(res);
        return res;
      }));

  }

  actualizarHeroe(heroe: HeroeInterface, key$: string) {

    //Body es ingual a JSON.Stringify para que cree un JSON con un string completamente VALIDO que usa Firebase
    let body = JSON.stringify(heroe);
    //Definimos el encabezado de la petición, es opcional pero esta para que validemos al mandar el header en la solicitud
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    //obtenemos la url con el nodo a actualizar
    let url = `${this.heroe_URL}/${key$}.json`;

    //Necesitamos que regrese un observable que nos diga si se inserto o no, para eso el http.post lo regresa.
    return this.http.put( url, body, {headers} )
    //map nos ayuda a trasnformar la data que viene
      .pipe(map(res => {
        console.log(res);
        return res;
      }));

  }

  getHeroe(key$: string){
    //obtenemos el url
    let url = `${this.heroe_URL}/${key$}.json`;
    return this.http.get(url)
      .pipe(map(res => {
        console.log(res);
        return res;
      }))
  }

}
