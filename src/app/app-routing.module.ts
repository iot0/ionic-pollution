import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "login", loadChildren: './login/login.module#LoginModule' },
  { path: "about", loadChildren: './about/about.module#AboutPageModule' },
  { path: "home", loadChildren: './home/home.module#HomePageModule' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'device-data', loadChildren: './device-data/device-data.module#DeviceDataPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
