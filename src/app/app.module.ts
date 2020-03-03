import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeModule } from "./home/home.module";
// import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
// import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
// import { AboutComponent } from './home-page/about/about.component';

const ProjectModules = [HomeModule, SharedModule];
const DependencyModules = [
  BrowserModule,
  AppRoutingModule,
  ProjectModules,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  // AngularFireStorageModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule.enablePersistence(),
  AngularFireAuthModule
];
@NgModule({
  declarations: [AppComponent],
  imports: [ProjectModules, DependencyModules],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
