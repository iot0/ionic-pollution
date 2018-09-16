import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable, of } from "rxjs";
import { take, tap, map, share, distinctUntilChanged } from "rxjs/operators";
import { FirestoreService } from "./firestore.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { UserRole } from "../models/user-role";
@Injectable({
  providedIn: "root"
})
export class UserService {
  userCollectionName: string = "pollutionUsers";

  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  currentUser$: Observable<User> = this.userSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  isLoggedIn$: Observable<boolean> = this.userSubject
    .asObservable()
    .pipe(map(x => !!x));

  isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map(x => {
      return x?x.Role===UserRole.Admin:false;
    })
  );

  isCustomer$: Observable<
    boolean
  > = this.userSubject.asObservable().pipe(
    map(x => x.Role === UserRole.Customer)
  );
  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    const user = window.localStorage["user"];
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  register(user: User) {
    return this.firestoreService.add(this.userCollectionName, user);
  }
  login(user: User): Observable<User> {
    return this.firestoreService
      .colWithIds$<User>(this.userCollectionName, ref => {
        return ref
          .where("PhoneNumber", "==", user.PhoneNumber)
          .where("Password", "==", user.Password)
          .limit(1);
      })
      .pipe(
        take(1),
        map(res => {
          return res.length > 0 ? res[0] : null;
        }),
        tap(x => {
          if (x !== null) {
            window.localStorage["user"] = JSON.stringify(x);
            this.userSubject.next(x);
          }
        })
      );
  }

  getAllCustomers(role: UserRole): Observable<any> {
    return this.firestoreService.colWithIds$<User>(
      this.userCollectionName,
      ref => {
        return ref.where("Role", "==", UserRole.Customer).limit(20);
      }
    );
  }

  logOut() {
    window.localStorage.removeItem("user");
    this.userSubject.next(null);
    return of(true);
  }
}
