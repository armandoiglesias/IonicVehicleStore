import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuariosProvider } from '../providers/usuarios/usuarios';

import { HttpModule } from '@angular/http';

import { LoginPage
  , CarritoPage
  , CategoriaPage
  , OrdenesDetallePage
  , OrdenesPage
  , PorCategoriasPage
  , ProductoPage
  , TabsPage, BuscarPage } from "../pages/index.paginas";

  import { ImagenPipe  } from "../pipes/imagen/imagen";

  import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  , CarritoPage
  , CategoriaPage
  , OrdenesDetallePage
  , OrdenesPage
  , PorCategoriasPage
  , ProductoPage
  , TabsPage, ImagenPipe , BuscarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), HttpModule
    , IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  , CarritoPage
  , CategoriaPage
  , OrdenesDetallePage
  , OrdenesPage
  , PorCategoriasPage
  , ProductoPage
  , TabsPage, BuscarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductosProvider,
    UsuariosProvider
  ]
})
export class AppModule {}
