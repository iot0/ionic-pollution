import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { timer } from "rxjs";
import { takeWhile, switchMap } from "rxjs/operators";
import { DeviceService } from "../shared/services/device.service";
import { ReportService } from "../shared/services/report.service";
import { ToastController, LoadingController } from "@ionic/angular";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"]
})
export class ReportPage implements OnInit, OnDestroy {
  value;
  alive = true;
  loading;
  user;
  constructor(
    private route: ActivatedRoute,
    public deviceService: DeviceService,
    public userService: UserService,
    private reportService: ReportService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      if (param.value) {
        this.value = param.value;
      }
    });
    this.userService.currentUser$.subscribe((user)=>{
     this.user=user;
    })
  }

  onSubmit(message: string) {
    if (this.value && message) {
      const data = {
        Value: this.value,
        Message: message,
        User:this.user
      };
      this.presentLoading(true);
      this.reportService
        .sendReport(data)
        .catch(err => {
          this.presentLoading(false);
          this.presentToast("Something Went Wrong !.");
          return err;
        })
        .then(res => {
          console.log(res);
          this.presentToast("Report Saved Successfully .");
          this.presentLoading(false);
        });
    } else {
      this.presentToast("Invalid Details .");
    }
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
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
