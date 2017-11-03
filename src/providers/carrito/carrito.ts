import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController, Platform, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
//import { UsuariosProvider } from "../index.services";

import { LoginPage, CarritoPage } from "../../pages/index.paginas";

import { URL_SERVICIOS } from "../../config/url.services";



@Injectable()
export class CarritoProvider {
  items: any[] = [];

  token: string;
  usuario: string;
  total: number = 0;

  ordenes:any[]= [];

  constructor(public http: Http
    , public alertCtrl: AlertController
    , public storage: Storage
    , public plat: Platform
    // , public _usuario: UsuariosProvider
    , public modal: ModalController) {
    console.log('Hello CarritoProvider Provider');
    this.obtenerStorage();
    this.CalcularTotal();
  }

  addToCart(item: any): boolean {


    let items = this.items.filter(x => {
      return x.codigo == item.codigo
    });
    //console.log(items.length);

    if (items.length > 0) {
      this.showAlert();
      return false;
    } else {
      this.items.push(item);
      this.guardarStorage();
      this.CalcularTotal();
      return true;
    }

    //
  }

  realizarPedido() {
    let data = new URLSearchParams();
    let codigos: string[] = [];
    this.items.forEach(x => {
      codigos.push(x.codigo);
    });

    data.append('items', codigos.join(','));

    let url = URL_SERVICIOS + `pedido/RealizarPedido/${ this.token}/${this.usuario}`;
    this.http.post(url, data)
      .subscribe(x => {
        let respuesta = x.json();
        if (respuesta.error) {
          console.error(respuesta.mensaje);
        } else {
          this.items = [];
          this.alertCtrl.create({
            title: 'Orden Creada!',
            subTitle: 'Un ejecutivo lo contactara a la brevedad!',
            buttons: ['OK']
          }).present();
        }
      });


  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Producto ya en el carro!',
      buttons: ['OK']
    });
    alert.present();
  }

  getCount() {
    return this.items.length;
  }

  verCarrito() {

    let modal: any;

    if (this.token) {
      modal = this.modal.create(CarritoPage);

    } else {
      modal = this.modal.create(LoginPage);
    }

    modal.present();
    modal.onDidDismiss((abrir: boolean) => {
      if (abrir) {
        this.modal.create(CarritoPage).present();
      }
    });

  }

  private guardarStorage() {
    if (this.plat.is("cordova")) {
      this.storage.ready().then(() => {
        this.storage.set("tiendaItems", this.items);
      });

    } else {
      localStorage.setItem("tiendaItems", JSON.stringify(this.items));
    }

  }

  CalcularTotal() {
    this.total = 0;
    this.items.forEach(element => {
      this.total += Number(element.precio_compra);
    });

  }

  borrarItem(id: number) {
    this.items.splice(id);
    this.guardarStorage();
  }

  private obtenerStorage() {

    let promesa = new Promise((resolve, reject) => {
      if (this.plat.is("cordova")) {
        this.storage.ready().then(() => {

          this.storage.get("tiendaItems").then((val) => {
            if (val)
              this.items = val;
          });


        });

      } else {
        if (localStorage.getItem('tiendaItems')) {
          this.items = JSON.parse(localStorage.getItem("tiendaItems"));
        }



      }

      resolve();
    });

    return promesa;


  }

  cargarOrdenes(){
    let url = `${URL_SERVICIOS}/pedido/obtenerPedido/${this.token}/${this.usuario}`;
    this.http.get(url).map(resp => resp.json())
      .subscribe(data => {
        if(data.error){

        }else{
          this.ordenes = data.ordenes;
        }
      });
  }

  borrarOrden(ordenId){
    let url = `${URL_SERVICIOS}/pedido/borrarPedido/${this.token}/${this.usuario}/${ordenId}`;
    return this.http.delete(url)
      .map(resp => resp.json());
      
    
  }



}
