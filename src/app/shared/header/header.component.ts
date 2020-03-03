import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { MatDialogRef, MatDialog } from "@angular/material/dialog";

import {
  faHamburger,
  faBars,
  faHeart,
  faStar,
  faArrowDown,
  faSortDown,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;
  faBars = faBars;
  isCollapse = false;
  faHeart = faHeart;
  faStar = faStar;
  faChevronDown = faChevronDown;

  @Input() isSearch: boolean = true;
  @Output() searchTerm = new EventEmitter<string>();
  isSignedIn: boolean;

  categories: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.ifUserLoggedIn().then(response => {
      this.isSignedIn = response;
    });

    this.searchForm = this.fb.group({
      term: ["", Validators.required]
    });

    this.fetchCategories();
    this.showSearch();
  }

  showSearch() {
    // this.headerService.currentMessage.subscribe(response => {
    // this.isSearch = response;
    // });
  }
  searchDomain() {
    let term: string = this.searchForm.get("term").value;
    // let searchTerm: SearchWord = {
    term: term.toLowerCase();

    // let searchTerms: SearchWord[] = []

    // console.log("getSearchWordByTerm->", term.toLowerCase());

    console.log("getSearchWordByTerm->", "Set");
    // this.searchWordService.setSearchWord(searchTerm).then(() => {
    //   this.router.navigateByUrl("/search/" + term);
    // })
  }

  fetchCategories() {
    // this.categoryService.getCategories().subscribe(response => {
    // this.categories = response;
    // })
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

  headerToggle() {
    this.isCollapse = !this.isCollapse;
  }
}
