import { Component, OnInit } from "@angular/core";
import {
  faArrowRight,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { AccountService } from "src/app/shared/services/account.service";
import { LoginService } from "src/app/shared/services/login.service";
import * as firebase from "firebase";
import { Account } from "../../shared/models/account.model";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.scss"]
})
export class UserAccountComponent implements OnInit {
  profileForm: FormGroup;
  account: Account;
  faArrowRight = faArrowRight;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      displayName: [""],
      email: [""],
      phoneNumber: [""],
      gender: [""],
      age: [""],
      address: [""],
      city: [""],
      state: [""]
    });

    let user = firebase.auth().currentUser;

    this.accountService.getAccountByUid(user.uid).subscribe(response => {
      this.account = response[0];
      this.updateProfile();
    });
  }

  updateProfile() {
    console.log("account......", this.account);
    if (this.account) {
      this.profileForm.patchValue({
        displayName: this.account.displayName,
        email: this.account.email,
        phoneNumber: this.account.phoneNumber,
        gender: this.account.gender,
        state: this.account.state,
        city: this.account.city,
        age: this.account.age,
        address: this.account.address
      });
    }
  }
  closeClicked() {
    this.location.back();
  }
  logout() {
    this.loginService.logout();
  }
  updateAccount() {
    console.log("this.getAccountObject()", this.getAccountObject());
    this.accountService.updateAccount(this.getAccountObject()).then(res => {
      const message = " Updeted Successfully";
      this.snackBar.open(message, " ", { duration: 2000 });
    });
  }
  getAccountObject() {
    var account: Account = {
      displayName: this.profileForm.get("displayName").value,
      phoneNumber: this.profileForm.get("phoneNumber").value,
      email: this.profileForm.get("email").value,
      gender: this.profileForm.get("gender").value,
      state: this.profileForm.get("state").value,
      age: this.profileForm.get("age").value,
      address: this.profileForm.get("address").value,
      city: this.profileForm.get("city").value
    };
    account.id = this.account.id;
    return Object.assign({}, account);
  }
}
