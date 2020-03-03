import { AccountService } from "./../../shared/services/account.service";
import { BookingService } from "./../../shared/services/booking.service";
import { Component, OnInit } from "@angular/core";
import { Doctor } from "src/app/shared/models/doctor.model";
import { DoctorsService } from "src/app/shared/services/doctors.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Booking } from "src/app/shared/models/booking.model";
import { FormBuilder, Validators } from "@angular/forms";
import * as firebase from "firebase";
import { Account } from "../../shared/models/account.model";
@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.component.html",
  styleUrls: ["./bookings.component.scss"]
})
export class BookingsComponent implements OnInit {
  booking: Booking = new Booking();
  toggle = false;
  status = "Enable";
  account: Account;
  doctor: Doctor;
  doctorId: string;
  bookingId: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private doctorsService: DoctorsService,
    private bookingService: BookingService,
    private accountService: AccountService
  ) {}
  bookingInputForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    patientMobileNumber: ["", Validators.required],
    age: ["", Validators.required],
    gender: ["", Validators.required],
    address: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    dateSlot: ["", Validators.required],
    timing: ["", Validators.required],
    symptoms: ["", Validators.required]
  });
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get("id");
    });

    // console.log(".......................", user.uid);
    this.getDoctor(this.doctorId);
    this.generateInvoiceNumber();
    let user = firebase.auth().currentUser;

    this.accountService.getAccountByUid(user.uid).subscribe(response => {
      this.account = response[0];
      this.selfBooking();
    });
  }
  getDoctor(id) {
    this.doctorsService.getDoctorById(id).subscribe(res => {
      this.doctor = res;
    });
  }

  bookAppointment() {
    this.bookingService.setBooking(this.getObj()).then(() => {
      this.router.navigate(["order/"]);
    });
  }
  generateInvoiceNumber() {
    this.bookingService.getLatestBookingId().subscribe(data => {
      if (data) {
        this.bookingId = this.getDocumentNumber(data.bookingId, "ASK");
      } else {
        this.bookingId = "ASK00000001";
      }
    });
  }

  getDocumentNumber(documentNo: string, prefix: string): string {
    const numberLength = 8;
    const padString = "0";
    const startingDigit = 1;
    const interval = 1;
    var previousDocNo: number;

    if (documentNo.length > 0) {
      previousDocNo = +documentNo.substr(prefix.length, numberLength);
    } else {
      previousDocNo = startingDigit;
    }

    var nextDocNo = previousDocNo + interval;
    const generatedNo =
      prefix + nextDocNo.toString().padStart(numberLength, padString);
    console.log("generatedNo", generatedNo);
    return generatedNo;
  }

  getObj() {
    let user = firebase.auth().currentUser;
    this.booking.patientName = this.bookingInputForm.get("name").value;
    this.booking.email = this.bookingInputForm.get("email").value;

    this.booking.patientAge = this.bookingInputForm.get("age").value;
    this.booking.patientGender = this.bookingInputForm.get("gender").value;
    this.booking.city = this.bookingInputForm.get("city").value;
    this.booking.patientAddress = this.bookingInputForm.get("address").value;
    this.booking.dateSlot = this.bookingInputForm.get("dateSlot").value;
    this.booking.timing = this.bookingInputForm.get("timing").value;
    // this.booking.patientGender = this.bookingInputForm.get("gender").value;
    this.booking.symptoms = this.bookingInputForm.get("symptoms").value;
    this.booking.bookingStatus = "BOOKED";
    this.booking.bookingId = this.bookingId;
    this.booking.doctorId = this.doctor.id;
    this.booking.patientMobileNumber = this.bookingInputForm.get(
      "patientMobileNumber"
    ).value;
    this.booking.doctorName = this.doctor.name;
    this.booking.doctorSpeciality = this.doctor.speciality;
    this.booking.userId = user.uid;
    console.log(".......bookingId.", this.booking.bookingId);
    const booking = Object.assign({}, this.booking);
    return booking;
  }
  selfBooking() {
    if (this.account) {
      this.bookingInputForm.patchValue({
        name: this.account.displayName,
        email: this.account.email,
        patientMobileNumber: this.account.phoneNumber,
        gender: this.account.gender,
        state: this.account.state,
        address: this.account.address,
        city: this.account.city,
        age: this.account.age
      });
    }
  }
  someoneElse() {
    this.bookingInputForm.reset();
  }
}
