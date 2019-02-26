import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  //una bandera que utilizaremos para ver si es un nuevo registro o una actualizacion
  id:boolean =false;

  //le llame llave para diferenciarlo de id y que sea claro
  key:string;

  constructor(private _heroesService: HeroesService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
    
    //Para obtener la URL y con eso sacamos la llave osea el ID para la actualización
    this._activatedRoute.params.subscribe(parametros => {
      console.log(parametros);
      //el id que viene de los parametros debe ser el mismo que declaramos en "app-routing.module.ts" es decir id
      this.key = parametros['id'];

      //Determinamos si cargamos los datos o no
      if (this.key !== 'id'){ //si es diferente de id osea que ya hay una llave en la URL entonces se cargan los datos
        this._heroesService.getHeroe(this.key)
          //Nos subscribimos para poder utiliza el servicio
          .subscribe(data => {
            //this.heroe es el que esta declarado en la parte superior eso lo igualamos a la Data para que cargue los datos almacenados de firebase en nuestro formulario
            return this.heroe = data
          })
      }
    })
    
  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.heroe);

    //Definimos si viene la palabra nuevo para insertar un registro o si viene la llave es una actualizacion del registro
    if (this.key == 'id') {
      //Insertando
      //Usamos el servicio "heroes.service.ts" y le pasamos el heroe
      this._heroesService.nuevoHeroe(this.heroe)
      //Se necesita el subscribe para poder guardar la data con el servicio
        .subscribe(data => {
          //name es el nombre que recibe los datos en firebase esto para que cambie el "id" por la clave en la URL y navegamos a esa pantall
          this._router.navigate(['/heroe', data.name]);
          //Por si pasa un error
        },error1 => console.error(error1));
    }else {
      //Actualizando
      //Usamos el servicio "heroes.service.ts" y le pasamos el heroe y la llave que estamos agarrando en la URL que lo hicimos en el constructor
      this._heroesService.actualizarHeroe(this.heroe, this.key)
      //Se necesita el subscribe para poder guardar la data con el servicio
        .subscribe(data => {
          console.log(data);
          //Por si pasa un error
        },error1 => console.error(error1));
    }
  }

  agregarNuevo(forma: NgForm){
    //navegamos a una nueva ruta
    this._router.navigate(['/heroe','id']);
    //Hacemos el reset de la forma del formulario, excepto la casa.
    forma.reset({
      casa: "Marvel"
    });
  }

}
