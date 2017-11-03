import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';

import { CarritoProvider } from "../../providers/index.services";


@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private _kartService:CarritoProvider
    , private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
  }

  borrarItem(id){
    this._kartService.borrarItem(id);
  }

  realizarPedido(){
    this._kartService.realizarPedido();
  }

}
