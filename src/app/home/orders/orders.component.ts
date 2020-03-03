import { OrderEditComponent } from "./../order-edit/order-edit.component";
import { BookingService } from "./../../shared/services/booking.service";
import { Component, OnInit, Inject } from "@angular/core";
import { Order } from "src/app/shared/models/order.model";
import {
  faArrowRight,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import * as firebase from "firebase";

import { LoginService } from "src/app/shared/services/login.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [
    "description",
    "amount",
    "email",
    "creationDate",
    "status",
    "showDetails"
  ];
  dataSource: any;

  orders: Order[] = [];
  faArrowRight = faArrowRight;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;

  constructor(
    private bookingService: BookingService,
    private loginService: LoginService,
    public dialog: MatDialog // public dialogRef: MatDialogRef<OrdersComponent>, // @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    let user = firebase.auth().currentUser;

    this.getOrdersByUid(user.uid);
  }

  getOrdersByUid(uid) {
    console.log("uid", uid);
    this.bookingService.getBookingByUid(uid).subscribe(response => {
      this.orders = response;
      this.dataSource = response;
      console.log("orders", response);
    });
  }

  logout() {
    this.loginService.logout();
  }
  showDetails(element) {
    console.log("showDetails", element);
    const dialogRef = this.dialog.open(OrderEditComponent, {
      width: "500px",

      data: { element: element }
    });
    dialogRef.afterClosed().subscribe(response => {
      // this.getCustomer();
    });
  }
}
