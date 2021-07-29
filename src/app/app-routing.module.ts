import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components

import {ProductslistadminComponent} from './components/productslistadmin/productslistadmin.component'
import {ProductslistComponent} from './components/productslist/productslist.component'
import {SingupComponent} from './components/singup/singup.component'
import {SinginComponent} from './components/singin/singin.component'
import { CreateproductComponent } from './components/createproduct/createproduct.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  },

  {
    path: 'productos',
    component: ProductslistComponent
  },

  {
    path: 'misproductos',
    component: ProductslistadminComponent
  },

  {
    path: 'ingresar',
    component: SinginComponent

  },

  {
    path: 'registrar',
    component: SingupComponent
  },

  {
    path: 'agregarproducto',
    component: CreateproductComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
