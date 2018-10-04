import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Distance pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'distance'
})
@Injectable()
export class Distance {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    let result = ""+value;
    if(value < 1){
      result = result.substr(2,3);
      result+=" m";
      return result;
    }else{
      result = result.substr(0,4);
      result += " Km";
      return result;
    }
    
  }
}
