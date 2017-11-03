import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from "../../providers/productos/productos";

import { PorCategoriasPage  } from "../index.paginas";

@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  porCategoria = PorCategoriasPage;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public _prod:ProductosProvider) {
  }



}
