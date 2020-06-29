import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';


const appRoutes: Routes = [
//   {path:'home',component: ,
//   children: [
//   ]},
  
  {path:'login', component:LoginComponent },
  {path:'home', component:HomeComponent},
  {path:'**', component: LoginComponent}
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
