import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AppRoutes } from "./app.routes";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { SidebarModule } from "ng-sidebar";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import {
  MaterialModule,
  AppBaseService,
  AppModule as CoreModule,
  MomentDateAdapterModule,
  PushNotificationModule,
} from "cms-core-ui";
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy
} from "@angular/common";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { environment } from "./../environments/environment";
import {
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderConfig
} from "ngx-ui-loader";
import * as $ from "jquery";
import { AdminComponent } from './projects/admin/admin.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#00ACC1",
  bgsOpacity: 1,
  bgsPosition: "bottom-right",
  bgsSize: 100,
  bgsType: "ball-scale-multiple",
  blur: 15,
  fgsColor: "#00ACC1",
  fgsPosition: "center-center",
  fgsSize: 100,
  fgsType: "ball-scale-multiple",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(255,255,255,0.8)",
  pbColor: "#39ab96",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: false,
  text: "",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  threshold: 500
};

@NgModule({
  declarations: [AppComponent, AdminComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MomentDateAdapterModule,
    // SidebarModule.forRoot(),
    CoreModule.forRoot(environment),
    RouterModule.forRoot(AppRoutes),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PushNotificationModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppBaseService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
