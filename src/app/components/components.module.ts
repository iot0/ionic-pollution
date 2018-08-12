import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ReportingFormComponent } from './reporting-form/reporting-form.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [GoogleMapComponent, ReportingFormComponent],
  exports:[GoogleMapComponent,ReportingFormComponent],
  entryComponents:[ReportingFormComponent]
})
export class ComponentsModule { }
