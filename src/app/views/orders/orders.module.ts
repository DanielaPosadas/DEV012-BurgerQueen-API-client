import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { OrdersComponent } from './orders.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [OrdersComponent]
})
export class OrdersModule { }