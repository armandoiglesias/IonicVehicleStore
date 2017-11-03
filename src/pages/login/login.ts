import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { UsuariosProvider, CarritoProvider } from "../../providers/index.services";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string="aiglesias.milco@gmail.com";
  contrasena:string="123456";

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private vCtrl: ViewController
    , public _usuario:UsuariosProvider
    , public _kart:CarritoProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this._usuario.ingresar(this.correo, this.contrasena).subscribe(data =>{
      console.log(data);

      if (this._usuario.activo()){

        this._kart.token = this._usuario.token;
        this._kart.usuario = this._usuario.usuarioId;
        this.vCtrl.dismiss(true);
      }
    });

  }

}
