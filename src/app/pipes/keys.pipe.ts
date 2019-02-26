import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  //Esta pendiente del ciclo de cambios que haga Angular
  pure: false
})
export class KeysPipe implements PipeTransform {
  //ESTE PIPE TRANSFORMA UN OBJETO EN UN ARREGLO
  transform(value: any): any {
    let keys = [];
    //value es el objeto que viene del firebase
    for (let key in value){
      //arreglo de llaves
      keys.push(key)
    }
    return keys
  }

}
