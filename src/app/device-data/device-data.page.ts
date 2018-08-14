import { Component, OnInit } from "@angular/core";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { ReportingFormComponent } from "../shared/components/reporting-form/reporting-form.component";

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
export class DeviceDataPage implements OnInit {
  pollutionStatuses = PollutionStatus;
  currentStatus = PollutionStatus.Nothing;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  onChangeStatus() {
    let value = this.currentStatus+1;

    if (value > 4) value = 1;

    this.currentStatus = value;// this.pollutionStatuses[value];
  }

  async onReport() {
    const modal = await this.modalController.create({
      component: ReportingFormComponent
    });
    return await modal.present();
  }
}
