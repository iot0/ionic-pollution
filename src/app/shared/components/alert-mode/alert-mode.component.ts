import { Component, OnInit,Input } from "@angular/core";
import { DeviceService } from "../../services/device.service";
import { ToastController, LoadingController } from "@ionic/angular";
import { catchError, finalize } from "rxjs/operators";

@Component({
  selector: "app-alert-mode",
  templateUrl: "./alert-mode.component.html",
  styleUrls: ["./alert-mode.component.scss"]
})
export class AlertModeComponent implements OnInit {
  loading;
  alertmode = 1;
  @Input("ip") ip;
  constructor(
    private deviceService: DeviceService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}
  changeMode() {
    if (this.ip) {
      this.presentLoading(true);
      let alertmode = this.alertmode == 0 ? 1 : 0;
      this.deviceService.changeMode(this.ip, alertmode)
      .pipe(
        finalize(()=>{
          this.presentLoading(false);
        }),
        catchError((err)=>{
        this.presentLoading(false);
        this.presentToast("Sorry something went wrong");
        return err;
      }))
      .subscribe(res => {
        this.presentLoading(false);
        this.alertmode = alertmode;
        let message =
          "Alert Mode is " + (this.alertmode===1 ? "Enabled" : "Disabled");
        this.presentToast(message);
      });
    }
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async presentLoading(show) {
    if (show) {
      this.loading = await this.loadingController.create({
        content: "Processing..."
      });
      return await this.loading.present();
    } else if (this.loading) {
      return await this.loading.dismiss();
    }
  }
}
