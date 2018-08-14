import { Component, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { LocationModalComponent } from "../shared/components/location-modal/location-modal.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    private router:Router
  ) {}

  ngOnInit() {}

  async selectLocation() {
    const modal = await this.modalController.create({
      component: LocationModalComponent
    });
    return await modal.present();
  }
  async onRegister() {
    const toast = await this.toastController.create({
      message: "Your are registered successfully.",
      duration: 2000
    });
    toast.present();
    this.router.navigate(["/home"]);
  }
}
