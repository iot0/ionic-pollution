import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { FirestoreService } from "./firestore.service";
import { UserService } from "./user.service";
@Injectable({
  providedIn: "root"
})
export class ReportService {
    collectionName: string = "pollutionReports";

  constructor(private firestoreService: FirestoreService,
    private userService:UserService
) {}

  sendReport(message:any) {
     const user= this.userService.userSubject.value;
      const request={
          ...message
      };
     return this.firestoreService.add(this.collectionName, request);
  }

  getAll():any {
    return this.firestoreService.colWithIds$(this.collectionName,
      (q)=>{
        return q.limit(30).orderBy("createdAt",'desc')
      });
  }
}
