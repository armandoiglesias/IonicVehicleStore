import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CarritoProvider, UsuariosProvider } from "../../providers/index.services";

import { OrdenesDetallePage } from "../index.paginas";

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public _kartService:CarritoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesPage');
  }

  ionViewWillEnter(){
    this._kartService.cargarOrdenes();
  }

  itemSelected(item:any){
    this.navCtrl.push(OrdenesDetallePage, { item});
  }

}
