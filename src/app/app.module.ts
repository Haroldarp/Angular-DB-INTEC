import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from "./app.routing";
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { BuildingComponent } from './component/building/building.component';
import { ReservationComponent } from './component/reservation/reservation.component';
import { CourseComponent } from './component/course/course.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { CoursesViewComponent } from './component/courses-view/courses-view.component';
import { AvailableNowComponent } from './component/available-now/available-now.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BuildingComponent,
    ReservationComponent,
    CourseComponent,
    HomePageComponent,
    CoursesViewComponent,
    AvailableNowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
