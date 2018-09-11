import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { KhMapsDirective } from "../../../../libs/kh-maps/src/lib/kh-maps.directive";
@Component({
  selector: "app-location-modal",
  templateUrl: "./location-modal.component.html",
  styleUrls: ["./location-modal.component.scss"]
})
export class LocationModalComponent implements OnInit {
  loading: boolean = true;
  selectedLoc;
  @Input("noSelection") noSelection=true;
  marker: any;
  @ViewChild("khMaps")
  khMaps: KhMapsDirective;
  constructor(public modalController: ModalController) {
    this.loading = true;
  }

  ngOnInit() {
    console.log(this.khMaps);
    console.log(this.marker);
  }

  onClose() {
    this.modalController.dismiss();
  }

  onMapInit(res) {
    console.log(res);
    this.loading = false;
  }
  onLocationSelect(e) {
    console.log(e);
    this.selectedLoc = e;
  }
  onSelect() {
    this.modalController.dismiss(this.selectedLoc);
  }
}
