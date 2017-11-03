import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from "../../config/url.services";

import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuariosProvider {

  token: string;
  usuarioId: string;

  constructor(public http: Http
    , public alertCtrl: AlertController, public storage: Storage
    , public plat: Platform) {
    console.log('Hello UsuariosProvider Provider');

      this.obtenerStorage();
  }

  ingresar(correo: string, constrasena: string) {
    let url = URL_SERVICIOS + "login/";
    let data = new URLSearchParams();
    data.append("correo", correo);
    data.append("contrasena", constrasena);


    return this.http.post(url, data)
      .map(resp => {
        let data = resp.json();

        console.log(data);

        if (data.error) {
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: data.mensaje,
            buttons: ['OK']
          });
          alert.present();
        } else {
          this.token = data.token;
          this.usuarioId = data.id_usuario;

          // Guardar
          this.guardarStorage();

        }
      });

  }

  salir() {
    this.token = null;
    this.usuarioId = "";

    // Guardar Storage
    this.guardarStorage();
  }

  activo():boolean{
    return (this.token) ? true : false;
  }

  private guardarStorage() {
    let tiendaUser = {
      'token': this.token,
      'usuario': this.usuarioId
    };

    if (this.plat.is("cordova")) {
      this.storage.ready().then(() => {
        this.storage.set("tiendaUser", tiendaUser);
      });

    } else {
      if (this.token) {
        localStorage.setItem("tiendaUser", JSON.stringify(tiendaUser));
      } else {
        localStorage.removeItem("tiendaUser");
      }

    }

  }

  private obtenerStorage() {
    let tiendaUser: any = {};
    let promesa = new Promise((resolve, reject) => {
      if (this.plat.is("cordova")) {
        this.storage.ready().then(() => {

          this.storage.get("tiendaUser").then((val) => {
            if (val) {
              tiendaUser = val;
              this.token = tiendaUser.token;
              this.usuarioId = tiendaUser.usuario;
            }
          });
        });

      } else {
        if (localStorage.getItem('tiendaUser')) {
          tiendaUser = JSON.parse(localStorage.getItem("tiendaUser"));
          this.token = tiendaUser.token;
          this.usuarioId = tiendaUser.usuario;
        }

      }

      resolve();
    });

    return promesa;


  }


}
