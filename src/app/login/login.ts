import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../shared/services/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController, LoadingController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { User } from "../shared/models/user";
import { UserRole } from "../shared/models/user-role";

@Component({
  selector: "login",
  templateUrl: "login.html",
  styleUrls: ["login.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading;
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.presentLoading(true);
      const formModel = this.loginForm.value;
      let data: User = {
        PhoneNumber: formModel.phoneNumber as string,
        Password: formModel.password as string
      };
      this.userService
        .login(data)
        .pipe(
          catchError(err => {
            this.presentLoading(false);
            this.presentToast("Something Went Wrong !.");
            return err;
          })
        )
        .subscribe((res: User) => {
          console.log(res);
          if (res !== null) {
            if (res.Role != UserRole.Admin) {
              this.router.navigate(["/device-sync"]);
            } else {
              this.router.navigate(["/admin"]);
            }
          } else {
            this.presentToast("Username or Password is incorrect .");
          }
          this.presentLoading(false);
        });
    } else {
      this.presentToast("Please fill all the required fields .");
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
