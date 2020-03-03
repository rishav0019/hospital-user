import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DoctorsService } from "src/app/shared/services/doctors.service";
import { Doctor } from "src/app/shared/models/doctor.model";
import { LoginService } from "src/app/shared/services/login.service";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.scss"]
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  // doctors = [
  //   { name: "Anand" },
  //   { name: "VIKASH" },
  //   { name: "Anand" },
  //   { name: "VIKASH" },
  //   { name: "Anand" },
  //   { name: "VIKASH" },
  //   { name: "VIKASH" }
  // ];
  constructor(
    private router: Router,
    private doctorsService: DoctorsService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.getDoctors();
  }
  getDoctors() {
    this.doctorsService.getDoctor().subscribe(res => {
      this.doctors = res;
      console.log("............", res);
    });
  }
  viewDetails(id) {
    this.router.navigate(["doctorDetails/", id]);
  }
  bookAppointment(id) {
    this.loginService.ifUserLoggedIn().then(res => {
      if (res) {
        this.router.navigate(["booking/", id]);
      } else {
        this.loginService.login();
      }
    });
  }
}
