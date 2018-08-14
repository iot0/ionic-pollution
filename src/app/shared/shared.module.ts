import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "./components/components.module";

const MODS = [CommonModule, ComponentsModule];

@NgModule({
  imports: [...MODS],
  declarations: [],
  exports: [...MODS]
})
export class SharedModule {}
