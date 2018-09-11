import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginPage } from "./login";

@NgModule({
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild([{ path: '', component: LoginPage }])
    ],
    declarations: [LoginPage]
  })
  export class LoginModule {}