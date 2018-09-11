import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";

import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule } from 'angularfire2/firestore' ;
import { HttpClientModule } from "@angular/common/http";
import { KhMapsModule } from "../libs/kh-maps/src/public_api";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase,"ionic-pollution"),
    AngularFirestoreModule,
    KhMapsModule.forRoot(environment.googleMapApiKey)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
