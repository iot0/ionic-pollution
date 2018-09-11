import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "login", loadChildren: './login/login.module#LoginModule' },
  { path: "about", loadChildren: './about/about.module#AboutPageModule' },
  { path: "home", loadChildren: './home/home.module#HomePageModule' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'device-data/:ip', loadChildren: './device-data/device-data.module#DeviceDataPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'device-sync', loadChildren: './device-sync/device-sync.module#DeviceSyncPageModule' },
  { path: 'report/:value', loadChildren: './report/report.module#ReportPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
