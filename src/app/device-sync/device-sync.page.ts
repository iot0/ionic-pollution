import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { DeviceService } from "../shared/services/device.service";
import { UserService } from "../shared/services/user.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-device-sync",
  templateUrl: "./device-sync.page.html",
  styleUrls: ["./device-sync.page.scss"]
})
export class DeviceSyncPage {
  alertmode: boolean = false;
  constructor(
    private router: Router,
    private deviceService: DeviceService,
    public toastController: ToastController,
    public userService: UserService
  ) {}

  onSync(ip: string) {
    if (ip) {
      this.deviceService
        .sync(ip)
        .pipe(
          catchError(err => {
            this.presentToast("Something went wrong");
            return err;
          })
        )
        .subscribe(res => {
          this.presentToast("Connected");
          this.router.navigate(["device-data", ip]);
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
  logOut() {
    this.userService.logOut().subscribe(() => {
      this.router.navigate(["/home"]);
    });
  }
}
