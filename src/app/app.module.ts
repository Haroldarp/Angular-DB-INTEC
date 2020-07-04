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
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { MyReservationComponent } from './component/my-reservation/my-reservation.component';
import { ReservationCardsComponent } from './component/reservation-cards/reservation-cards.component';

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
    AvailableNowComponent,
    SignUpComponent,
    MyReservationComponent,
    ReservationCardsComponent
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
