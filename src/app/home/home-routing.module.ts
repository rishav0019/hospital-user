import { OrdersComponent } from "./orders/orders.component";
// import { BookingDetailsComponent } from "./booking-details/booking-details.component";
import { BookingsComponent } from "./bookings/bookings.component";
// import { BookingComponent } from "./booking/booking.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DoctorDetailComponent } from "./doctor-detail/doctor-detail.component";
import { AuthGuard } from "../shared/guards/auth.guard";
import { UserAccountComponent } from "./user-account/user-account.component";
import { AboutComponent } from "./home-page/about/about.component";
// import { AboutComponent } from "../home-page/about/about.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "doctors",
    component: DoctorsComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "doctorDetails/:id",
    component: DoctorDetailComponent
  },

  {
    path: "booking/:id",
    component: BookingsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "order",
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "account",
    component: UserAccountComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
