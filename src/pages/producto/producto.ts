import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import {  CarritoProvider } from "../../providers/index.services";

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto : any = {};

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public _carrito:CarritoProvider) {
    this.producto = navParams.get('producto');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }

  addToCart(producto){
    if (this._carrito.addToCart(producto))
      this.navCtrl.pop();
    
  }

  

}
