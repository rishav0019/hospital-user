import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  doctors() {
    this.router.navigateByUrl("doctors");
  }
  imageObject: Array<object> = [
    {
      image: "../../../assets/images/slider_1.jpg",
      thumbImage: "../../../assets/images/slider_1.jpg",
      alt: "alt of image"
    },
    {
      image: "../../../assets/images/slider_2.jpg", // Support base64 image
      thumbImage: "../../../assets/images/slider_2.jpg", // Support base64 image

      alt: "Image alt" //Optional: You can use this key if want to show image with alt
    },
    {
      image: "../../../assets/images/slider_3.jpg",
      thumbImage: "../../../assets/images/slider_3.jpg",
      alt: "alt of image"
    },
    {
      image: "../../../assets/images/slider_4.jpg", // Support base64 image
      thumbImage: "../../../assets/images/slider_4.jpg", // Support base64 image

      alt: "Image alt" //Optional: You can use this key if want to show image with alt
    }
  ];
  // imageObject1: Array<object> = [

  // ];
}
