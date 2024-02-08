import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './views/login/login.module';
import { HeaderComponent } from './core/header/header/header.component';
import { FooterComponent } from './core/footer/footer/footer.component';
import { OrdersModule } from './views/orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
