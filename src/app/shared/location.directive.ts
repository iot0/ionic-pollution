import {
    Directive,
    NgZone,
    HostListener,
    Output,
    EventEmitter,
    Input,
    OnInit
  } from "@angular/core";
  import { ModalController } from "@ionic/angular";
  import { LocationModalComponent } from "./components/location-modal/location-modal.component";
  
  @Directive({
    selector: "[appLocation]"
  })
  export class LocationDirective implements OnInit{
    
  
    @Input("appLocation") marker;
    @Input("noSelection") noSelection;
  
    constructor(private modalCtrl: ModalController) {}
  
    ngOnInit(): void {
     console.log("Location directive oninit");
    }
    @Output("onSelect")
    onLocation:EventEmitter<any>=new EventEmitter();
  
    @HostListener("click")
    async openMap() {
      let props=null;
      if (this.marker) {
        try {
          let marker = JSON.parse(this.marker);
          if (marker.lat && marker.lng) {
            props={
              marker:marker
            };
          }
        } catch (e) {}
      }
      const modal = await this.modalCtrl.create({
          component: LocationModalComponent,
          componentProps:props
        });
        modal.onWillDismiss(res => {
          if (res.data) {
            this.onLocation.emit(res.data);
          }
        });
        return await modal.present();
    }
  }
  