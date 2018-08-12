import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  GoogleMap,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMapsEvent
} from "@ionic-native/google-maps";

declare var google: any;
@Component({
  selector: "google-map",
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"]
})
export class GoogleMapComponent implements OnInit {
  @ViewChild("map")
  mapElement: ElementRef;

  map: GoogleMap;
  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        console.log(resp);
        this.initMap(resp.coords);
        // resp.coords.latitude
        // resp.coords.longitude
      })

    // let watch = this.geolocation.watchPosition();
    // watch.subscribe(data => {
    //   console.log(data);
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    // });
  }

  initMap(coords?: any) {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat:coords.latitude,
          lng:coords.longitude
        },
        zoom: 14,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);
    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("map is ready to use.");
    });
  }
}
