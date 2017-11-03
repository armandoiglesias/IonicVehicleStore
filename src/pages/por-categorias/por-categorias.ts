import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductosProvider  } from "../../providers/productos/productos";

import { ProductoPage } from "../index.paginas";

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  categoria:any = {};

  constructor(public navCtrl: NavController
      , public navParams: NavParams
      , public _prod:ProductosProvider) {

    console.log(this.navParams.get('lista'));
    this.categoria = this.navParams.get('lista');
    this._prod.cargatCategoria(this.categoria.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PorCategoriasPage');
  }

  verProducto(producto:any){
    this.navCtrl.push( ProductoPage, {producto});
  }

}
