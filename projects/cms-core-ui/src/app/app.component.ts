import { Component, ViewEncapsulation } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd
} from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  loadingRouteConfig: boolean;
  constructor(
    translate: TranslateService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : "en");
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
        this.ngxService.start();
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => {
          this.ngxService.stop();
        }, 1000);
        this.loadingRouteConfig = false;
      }
    });
  }
}
