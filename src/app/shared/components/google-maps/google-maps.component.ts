import {
  Component,
  OnInit,
  ElementRef,
  Inject,
  Renderer2
} from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { Plugins } from "@capacitor/core";
import { environment } from "../../../../environments/environment";
import { LoadingController, ToastController } from "@ionic/angular";

const { Geolocation, Network } = Plugins;

@Component({
  selector: "google-maps",
  template: "",
  styleUrls: ["./google-maps.component.scss"]
})
export class GoogleMapsComponent implements OnInit {
  map;
  apiKey: string;
  public markers: any[] = [];
  private mapsLoaded: boolean = false;
  private networkHandler = null;
  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    @Inject(DOCUMENT) private _document,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    this.apiKey = environment.googleMapApiKey;
  }

  async ngOnInit() {
    const loading =await this.presentLoading();
    loading.present();
    this.init()
      .then(
        res => {
          console.log("Google Maps ready.");
          loading.dismiss();
        },
        err => {
          loading.dismiss();
          console.log(err);
          this.presentToast("Error loading map ");
        }
      );
  }

  async presentToast(message) {
    return await this.loadingController.create({
      content: message
    });
  }
  async presentLoading() {
    return await this.loadingController.create({
      content: "Loading..."
    });
  }

  private init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadSDK().then(
        res => {
          this.initMap().then(
            res => {
              resolve(true);
            },
            err => {
              reject(err);
            }
          );
        },
        err => {
          reject(err);
        }
      );
    });
  }

  private loadSDK(): Promise<any> {
    console.log("Loading Google Maps SDK");

    return new Promise((resolve, reject) => {
      if (!this.mapsLoaded) {
        Network.getStatus().then(
          status => {
            if (status.connected) {
              this.injectSDK().then(
                res => {
                  resolve(true);
                },
                err => {
                  reject(err);
                }
              );
            } else {
              if (this.networkHandler == null) {
                this.networkHandler = Network.addListener(
                  "networkStatusChange",
                  status => {
                    if (status.connected) {
                      this.networkHandler.remove();

                      this.init().then(
                        res => {
                          console.log("Google Maps ready.");
                        },
                        err => {
                          console.log(err);
                        }
                      );
                    }
                  }
                );
              }

              reject("Not online");
            }
          },
          err => {
            // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
            if (navigator.onLine) {
              this.injectSDK().then(
                res => {
                  resolve(true);
                },
                err => {
                  reject(err);
                }
              );
            } else {
              reject("Not online");
            }
          }
        );
      } else {
        reject("SDK already loaded");
      }
    });
  }
  private injectSDK(): Promise<any> {
    return new Promise((resolve, reject) => {
      window["mapInit"] = () => {
        this.mapsLoaded = true;
        resolve(true);
      };

      let script = this.renderer.createElement("script");
      script.id = "googleMaps";

      if (this.apiKey) {
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=" +
          this.apiKey +
          "&callback=mapInit";
      } else {
        script.src = "https://maps.googleapis.com/maps/api/js?callback=mapInit";
      }

      this.renderer.appendChild(this._document.body, script);
    });
  }

  private initMap(): Promise<any> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition().then(
        position => {
          console.log(position);

          let latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          let mapOptions = {
            center: latLng,
            zoom: 15
          };

          this.map = new google.maps.Map(
            this.element.nativeElement,
            mapOptions
          );

          //add marker
          this.addMarker(position.coords.latitude, position.coords.longitude);

          resolve(true);
        },
        err => {
          reject("Could not initialise map");
        }
      );
    });
  }

  public addMarker(lat: number, lng: number): void {
    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);
  }
}
