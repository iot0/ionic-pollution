import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { LocationModalComponent } from "../shared/components/location-modal/location-modal.component";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../shared/services/user.service";
import { User } from "../shared/models/user";
import { UserRole } from "../shared/models/user-role";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  loading;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private userService: UserService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.registerForm = this.fb.group({
      fullName: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
      latLng: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: User = {
      FullName: formModel.fullName as string,
      LatLng: formModel.latLng as string,
      Address: formModel.address as string,
      PhoneNumber: formModel.phoneNumber as string,
      Password: formModel.password as string
    };

    return data;
  }

  onRegister() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data: User = this.prepareSaveInfo();
      data.Role = UserRole.Customer;
      this.presentLoading(true);
      this.userService
        .register(data)
        .then(res => {
          this.presentLoading(false);
          this.router.navigate(["/home"]);
          this.presentToast("Registration successfull .");
        })
        .catch(err => {
          this.presentLoading(false);
          this.presentToast("Something went wrong .");
        });
    } else {
      this.presentToast("Please fill all the required fields .");
    }
  }
  onLocationSelect(location) {
    if (location) {
      this.registerForm
        .get("latLng")
        .setValue(JSON.stringify(location));
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
