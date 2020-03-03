import { Doctor } from "./../../shared/models/doctor.model";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DoctorsService } from "src/app/shared/services/doctors.service";
import { LoginService } from "src/app/shared/services/login.service";

@Component({
  selector: "app-doctor-detail",
  templateUrl: "./doctor-detail.component.html",
  styleUrls: ["./doctor-detail.component.scss"]
})
export class DoctorDetailComponent implements OnInit {
  charLimit = 120;
  doctors: Doctor[] = [];
  doctor: Doctor;
  doctorId: string;

  constructor(
    private router: Router,
    private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get("id");
      console.log(this.doctorId);
    });

    this.getDoctor(this.doctorId);
  }
  getDoctors() {
    this.doctorsService.getDoctor().subscribe(res => {
      this.doctors = res;
      console.log("............", res);
    });
  }
  getDoctor(id) {
    this.doctorsService.getDoctorById(id).subscribe(res => {
      this.doctor = res;
      console.log("............", res);
    });
  }
  bookAppointment(id) {
    // this.router.navigateByUrl("booking");

    this.loginService.ifUserLoggedIn().then(res => {
      if (res) {
        this.router.navigate(["booking/", id]);
      } else {
        this.loginService.login();
      }
    });
  }
}
