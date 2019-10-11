import { filter } from "rxjs/operators";
import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { SearchService } from "../../services/search.service";
import { AuthService } from "./../../services/auth.service";

const SMALL_WIDTH_BREAKPOINT = 991;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
  opened?: boolean;
}

@Component({
  selector: "app-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private _router: Subscription;
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  routeOptions: Options;

  options = {
    lang: "fr",
    theme: "light",
    settings: false,
    docked: false,
    boxed: false,
    opened: true,
    mode: "push"
  };

  _mode = this.options.mode;
  _autoCollapseWidth = 991;

  currentLang = "fr";

  @ViewChild("sidebar") sidebar;

  constructor(
    private _element: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private modalService: NgbModal,
    private titleService: Title,
    private searchService: SearchService,
    public authService: AuthService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : "en");
    // this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  onRouteChange() {
    let searchService = this.searchService;
    let url = this.router.url.split("?")[0].split("/")[0];
    setTimeout(function() {
      let filter = document.getElementsByClassName("divfilter").length;
      if (filter == 0) {
        searchService.setSearch([]);
      }
    }, 1000);
  }

  ngOnInit(): void {
    this._router = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Scroll to top on view load
        document.querySelector(".main-content").scrollTop = 0;

        if (this.isOver()) {
          this._mode = "over";
          this.options.opened = false;
        }

        this.runOnRouteChange();
      });

    this.runOnRouteChange();
  }

  ngAfterViewInit(): void {
    setTimeout(_ => this.runOnRouteChange());
  }

  ngOnDestroy() {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver() || this.router.url === "/maps/fullscreen") {
      this.options.opened = false;
    }

    this.route.children.forEach((route: ActivatedRoute) => {
      let activeRoute: ActivatedRoute = route;
      while (activeRoute.firstChild) {
        activeRoute = activeRoute.firstChild;
      }
      this.routeOptions = activeRoute.snapshot.data;
    });

    if (this.routeOptions) {
      if (this.routeOptions.hasOwnProperty("heading")) {
        this.setTitle(this.routeOptions.heading);
      }
    }

    // //Check has Access
    // let page = this.router.url.split("/")[
    //   this.router.url.split("/").length - 1
    // ];
    // const _this = this;
    // this.authService.getMenuList().then(function(list: any) {
    //   let menu = list.find(
    //     i => i.menu.location === page && i.menu.parentid > 0
    //   );
    //   if (!menu) {
    //     _this.router.navigate(["/"]);
    //   }
    // });
  }

  setTitle(newTitle: string) {
    // this.titleService.setTitle( 'Lab| ' + newTitle );
    this.titleService.setTitle("Medcare");
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  toogleSidebar(): void {
    this._mode = this._mode == "dock" ? "push" : "dock";
    // this.options.opened = !this.options.opened;
  }

  receiveMessage($event) {
    this.options = $event;
  }

  openSearch(search) {
    this.modalService.open(search, { windowClass: "search", backdrop: false });
  }

  toggleFullscreen(): void {
    const elem = this._element.nativeElement.querySelector(".main-content");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }
}
