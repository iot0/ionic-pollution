import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingFormComponent } from './reporting-form/reporting-form.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { LocationModalComponent } from './location-modal/location-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [ReportingFormComponent,GoogleMapsComponent, LocationModalComponent],
  exports:[ReportingFormComponent,GoogleMapsComponent,LocationModalComponent],
  entryComponents:[ReportingFormComponent,LocationModalComponent]
})
export class ComponentsModule { }
