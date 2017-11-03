import { Pipe, PipeTransform } from '@angular/core';

import { URL_IMAGEN } from "../../config/url.services";

/**
 * Generated class for the ImagenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(codigo: string, ...args) {


    return URL_IMAGEN + codigo +".jpg" ;
  }
}
