import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



import { URL_SERVICIOS } from "../../config/url.services";

/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosProvider {

  pagina : number = 0;
  productos:any = [];

  lineas:any[]= [];

  prodporCategoria:any[]= [];

  constructor(public http: Http) {
    console.log('Hello ProductosProvider Provider');
    this.cargarTodos();
    this.cargarLineas();
  }

  cargatCategoria(id:number){
    let url=  URL_SERVICIOS + "producto/porTipo/" + id;
    this.http.get(url)
      .map( resp => resp.json())
      .subscribe(data => {
        console.log(data);
        if(data.error){
          
        }else{
          this.prodporCategoria = data.productos;
        }
      });

  }

  cargarLineas(){
    let url = URL_SERVICIOS + "linea/";
    this.http.get(url)
      .map(resp => resp.json())
      .subscribe( data => {
        if(data.error){

        }else{
          console.log(data.lineas);
          this.lineas = data.lineas;
        }
      } );
  }

  cargarTodos(){

    let primesa = new Promise( (resolve, reject)=> {
 let url = URL_SERVICIOS + "producto/" + this.pagina;
    this.http.get(url).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        if(data.error){
          
        }else{
            this.productos.push (...data.productos);
            this.pagina++;
        }
          resolve();
      });
    });

    return primesa;
 

  }

  buscarPorTermino(termino:string){
let url = `${URL_SERVICIOS}producto/buscar/${termino}`;
    return this.http.get(url)
      .map(resp => resp.json());
  }

}
