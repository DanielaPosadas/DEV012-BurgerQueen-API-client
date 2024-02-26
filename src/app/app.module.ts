import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './views/login/login.module';
import { OrdersModule } from './views/orders/orders.module';
import { MealComponent } from './core/menu/meal/meal.component';
import { BeveragesComponent } from './core/menu/beverages/beverages.component';
import { SidesComponent } from './core/menu/sides/sides.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    OrdersModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
