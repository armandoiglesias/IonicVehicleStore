import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from "../../providers/index.services";

import { ProductoPage } from "../index.paginas";

@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public _producto: ProductosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarPage');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();



    // set val to the value of the searchbar
    let val = ev.target.value;
    if (!val || val.trim() == '')
      return;

    this._producto.buscarPorTermino(val).subscribe(data => {
      if (data.error) {

      } else {
        this.items = data.productos;
        if (val && val.trim() != '') {


          this.items = this.items.filter((item:any) => {
            return (item.producto.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      }
    });

    // if the value is an empty string don't filter the items

  }

  verProducto(item){
    this.navCtrl.push(ProductoPage, { 'producto' : item});
  }

}
