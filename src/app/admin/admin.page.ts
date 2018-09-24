import { Component, OnInit } from '@angular/core';
import { ReportService } from '../shared/services/report.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });

  constructor(
    private reportService: ReportService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public userService: UserService,
    public router: Router
  ) {}

  ngOnInit() {
    this.reportService
      .getAll()
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
        console.log(res);
      });
  }
  logOut() {
    this.userService.logOut().subscribe(() => {
      this.router.navigate(["/home"]);
    });
  }
}
