import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomePageComponent } from "./home-page/home-page.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { DoctorDetailComponent } from "./doctor-detail/doctor-detail.component";

import { BookingsComponent } from "./bookings/bookings.component";
import { LoginComponent } from "./login/login.component";
import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";
import { OrdersComponent } from "./orders/orders.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { OrderEditComponent } from "./order-edit/order-edit.component";
import { AboutComponent } from './home-page/about/about.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod:
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
      requireDisplayName: true
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInFlow: "popup"
};

@NgModule({
  declarations: [
    HomePageComponent,
    DoctorsComponent,
    DoctorDetailComponent,
    BookingsComponent,

    LoginComponent,
    OrdersComponent,
    UserAccountComponent,
    OrderEditComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  exports: [HomePageComponent, LoginComponent, OrderEditComponent]
})
export class HomeModule {}
