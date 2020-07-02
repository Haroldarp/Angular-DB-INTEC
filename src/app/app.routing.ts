import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {BuildingComponent} from './component/building/building.component';
import {ReservationComponent} from './component/reservation/reservation.component';
import { CourseComponent } from './component/course/course.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { CoursesViewComponent } from './component/courses-view/courses-view.component';
import { AvailableNowComponent } from './component/available-now/available-now.component';




const appRoutes: Routes = [
  {path:'', component:HomePageComponent},
  {path:'home', component:HomeComponent, children:
  [
    {path:'', redirectTo: '/home/edificios', pathMatch: 'full'},
    {path:'disponible-ahora', component:AvailableNowComponent},
    {path:'edificios', component:BuildingComponent},
    {path:'curso/:building', component:CoursesViewComponent},
    {path:'reserva/:course', component:ReservationComponent}
  ]},

  {path:'login', component:LoginComponent},
  {path:'**', component: LoginComponent}
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
