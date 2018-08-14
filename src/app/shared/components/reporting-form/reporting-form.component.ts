import { Component, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";

@Component({
  selector: "reporting-form",
  templateUrl: "./reporting-form.component.html",
  styleUrls: ["./reporting-form.component.scss"]
})
export class ReportingFormComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    public toastController: ToastController
  ) {}

  ngOnInit() {}
  onCancel() {
    this.modalController.dismiss();
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      message: "Your message sent successfully.",
      duration: 2000
    });
    this.modalController.dismiss();
    toast.present();
  }
}
