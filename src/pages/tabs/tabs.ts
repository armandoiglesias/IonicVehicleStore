import { Component } from '@angular/core';

import { HomePage, CategoriaPage, OrdenesPage, BuscarPage } from "../index.paginas";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

tab1:any = HomePage  ;
tab2:any = CategoriaPage;  
tab3:any = OrdenesPage  ;
tab4:any = BuscarPage  ;


}
