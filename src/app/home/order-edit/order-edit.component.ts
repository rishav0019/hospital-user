import { BookingService } from "./../../shared/services/booking.service";
import { element } from "protractor";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Booking } from "src/app/shared/models/booking.model";

@Component({
  selector: "app-order-edit",
  templateUrl: "./order-edit.component.html",
  styleUrls: ["./order-edit.component.scss"]
})
export class OrderEditComponent implements OnInit {
  booking: Booking;
  constructor(
    public dialogRef: MatDialogRef<OrderEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    // this.booking = this.data.element;
    // console.log(this.booking.id);
    this.bookingService.getBookingById(this.data.element.id).subscribe(res => {
      console.log("getBookingById", res);
      this.booking = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
