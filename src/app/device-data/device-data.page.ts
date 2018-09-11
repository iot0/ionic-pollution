import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  ActionSheetController,
  ModalController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { DeviceService } from "../shared/services/device.service";
import { timer } from "rxjs";
import { takeWhile, switchMap, catchError } from "rxjs/operators";

enum PollutionStatus {
  Nothing = 1,
  Safe,
  Warning,
  Danger
}

@Component({
  selector: "app-device-data",
  templateUrl: "./device-data.page.html",
  styleUrls: ["./device-data.page.scss"]
})
export class DeviceDataPage implements OnInit, OnDestroy {
  pollutionStatuses = PollutionStatus;
  currentStatus = PollutionStatus.Nothing;
  alive: boolean = true;
  ip;
  value = 0;
  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public deviceService: DeviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.ip) {
        this.ip = param.ip;
        timer(1000, 2000)
          .pipe(
            takeWhile(() => this.alive),
            switchMap(x => {
              return this.deviceService.sync(this.ip);
            }),
            catchError(err => {
              this.presentToast("Something went wrong!");
              return err;
            })
          )
          .subscribe(res => {
            console.log(res);
            const value = res["value"];
            if (value) {
              this.value = value;
              if (value <= 350) {
                this.currentStatus = PollutionStatus.Safe;
              } else if (value <= 1000) {
                this.currentStatus = PollutionStatus.Warning;
              } else {
                this.currentStatus = PollutionStatus.Danger;
              }
            }
          });
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  ngOnDestroy(): void {
    this.alive = false; // switches your IntervalObservable off
    console.log("Device data destroyed");
  }
}
