import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductoPage } from "../index.paginas";
import { ProductosProvider, CarritoProvider, UsuariosProvider } from "../../providers/index.services";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productos: any = [];
  kartCount = 0;

  constructor(public navCtrl: NavController
    , public _prod: ProductosProvider
    , public _kart: CarritoProvider
    , public _usuario:UsuariosProvider) {

    //this.kartCount = _kart.getCount();

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this._prod.cargarTodos().then(() => infiniteScroll.complete());

    console.log('Async operation has ended');


  }
  
  verCarrito() {
    this._kart.verCarrito();
  }

  verProducto(producto: any) {
    this.navCtrl.push(ProductoPage, { producto });
  }

  salir(){
    this._usuario.salir();
  }

}
