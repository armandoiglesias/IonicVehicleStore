import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { CarritoProvider } from "../../providers/index.services";



@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  item = {};

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public _kart: CarritoProvider
    , public alertCtrl: AlertController) {

    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesDetallePage');
  }

  borrarOrden(ordenId) {

    this._kart.borrarOrden(ordenId)
      .subscribe(data => {
        if (data.error) {

        } else {
          let alert = this.alertCtrl.create({
            title: 'Orden Borrada!',
            subTitle: 'Se borro la orden seleccionada',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
        }
      });
  }

}
