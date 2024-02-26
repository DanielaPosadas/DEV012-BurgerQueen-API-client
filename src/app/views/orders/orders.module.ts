import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { OrdersComponent } from './orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/core/header/header/header.component';
import { FooterComponent } from 'src/app/core/footer/footer/footer.component';
import { BreakfastComponent } from 'src/app/core/menu/breakfast/breakfast.component';
import { MealComponent } from 'src/app/core/menu/meal/meal.component';
import { BeveragesComponent } from 'src/app/core/menu/beverages/beverages.component';
import { SidesComponent } from 'src/app/core/menu/sides/sides.component';

@NgModule({
  declarations: [
    OrdersComponent,
    HeaderComponent,
    FooterComponent,
    BreakfastComponent,
    MealComponent,
    BeveragesComponent,
    SidesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [OrdersComponent]
})
export class OrdersModule { }