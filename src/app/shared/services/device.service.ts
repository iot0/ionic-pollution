import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class DeviceService {
  deviceSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  device$ = this.deviceSubject.asObservable();
  clearInterval;
  constructor(private http: HttpClient) {}

  sync(ip: string) {
    return this.http.get(`http://${ip}/status`).pipe(
      tap(res => {
        this.deviceSubject.next(res);
        console.log(res);
      })
    );
  }

  update(ip,device) {
    return this.http
      .post(`http://${ip}/update`, device)
      .pipe(tap(res => {
          console.log(res);
      }));
  }
  changeMode(ip,isActive) {
    return this.http
      .post(`http://${ip}/update_alertmode`, {alertmode:isActive})
      .pipe(tap(res => {
          console.log(res);
      }));
  }
}
