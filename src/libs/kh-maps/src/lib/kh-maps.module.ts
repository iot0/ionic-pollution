import { NgModule, ModuleWithProviders } from '@angular/core';
import { KhMapsDirective } from './kh-maps.directive';
import { KH_MAP_KEY } from './kh-maps.config';

@NgModule({
  imports: [
  ],
  declarations: [KhMapsDirective],
  exports: [KhMapsDirective]
})
export class KhMapsModule {
  static forRoot(apiKey?:string): ModuleWithProviders {
    return {
      ngModule: KhMapsModule,
      providers: [
        {provide: KH_MAP_KEY, useValue: apiKey}
      ],
    };
  }
 }
