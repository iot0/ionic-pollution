import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { AlertModeComponent } from './alert-mode/alert-mode.component';
import { LocationDirective } from '../location.directive';
import { KhMapsModule } from '../../../libs/kh-maps/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    KhMapsModule
  ],
  declarations: [GoogleMapsComponent, LocationModalComponent, AlertModeComponent,LocationDirective],
  exports:[GoogleMapsComponent,LocationModalComponent,AlertModeComponent,LocationDirective],
  entryComponents:[LocationModalComponent]
})
export class ComponentsModule { }
