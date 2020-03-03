import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";

import { MatDialog } from "@angular/material/dialog";
import { LoginService } from "../services/login.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private loginService: LoginService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
