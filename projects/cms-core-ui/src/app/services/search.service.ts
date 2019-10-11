import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable()
export class SearchService implements OnDestroy {
  constructor(private ngxService: NgxUiLoaderService) {}

  ngOnDestroy() {
    console.log("Service destroy");
  }

  search = {};
  private searchSubject = new Subject<any>();
  getSearch = this.searchSubject.asObservable();

  private elasticSearchSubject = new Subject<any>();
  getElasticSearch = this.elasticSearchSubject.asObservable();

  result = {};
  private resultSubject = new Subject<any>();
  getResult = this.resultSubject.asObservable();

  menu = {};
  private menuSubject = new Subject<any>();
  getMenu = this.menuSubject.asObservable();

  private menuSubject1 = new Subject<any>();
  getrefresh = this.menuSubject1.asObservable();

  setSearch(search) {
    this.search = search;
    this.searchSubject.next(this.search);
  }

  setElasticSearch(search) {
    //this.elasticSearch = search;
    this.elasticSearchSubject.next(search);
  }

  setResult(result) {
    this.result = result;
    this.resultSubject.next(this.result);
  }

  clearSearch() {
    this.search = {};
  }

  setMenu(menu, parent) {
    if (menu) {
      this.menu = menu;
      this.menu["parent"] = parent;
      this.menuSubject.next(this.menu);
    }
  }

  addHyphenInIdentificationID(result, identificationType) {
    let identificationID = result.identificationID;
    if (identificationType === "MYKAD" || identificationType == "1") {
      if (
        identificationID != undefined &&
        result.identificationType.isIC !== undefined &&
        result.identificationType.isIC &&
        identificationID.length === 12
      ) {
        let identificationIDFirst = identificationID.slice(0, 6);
        let identificationIDSecond = identificationID.slice(6, 8);
        let identificationIDThird = identificationID.slice(8);
        identificationID =
          identificationIDFirst +
          "-" +
          identificationIDSecond +
          "-" +
          identificationIDThird;
      }
    }
    return identificationID;
  }
}
