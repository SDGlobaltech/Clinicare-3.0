import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import {PushNotificationModule} from "./modules/push-notification/push-notification.module";
import { MaterialModule } from "./modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { SidebarModule } from "ng-sidebar";
import { AgmCoreModule } from "@agm/core";
import { LoadingBarHttpModule } from "@ngx-loading-bar/http";
import { AppComponent } from "./app.component";
import { AuthGuardGuard } from "./shared/authguard/auth-guard.guard";
import { AppserviceService } from "./shared/appservice.service";
import { HttpModule } from "@angular/http";
import { SearchService } from "./services/search.service";
import { ApplicationConfigService } from "./services/application-config.service";
import { AuthService } from "./services/auth.service";
import { PatientService } from "./services/patient.service";
import { SigninComponent } from "./authentication/signin/signin.component";
import { ForgotComponent } from "./authentication/forgot/forgot.component";
import { LockscreenComponent } from "./authentication/lockscreen/lockscreen.component";
import { SignupComponent } from "./authentication/signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgxEchartsModule } from "ngx-echarts";
import { InfoDialogComponent } from "./core/info-dialog/info-dialog.component";
import { settingsDialog } from "./core/header/header.component";
import { profileDialog } from "./core/header/header.component";
import { unitDialog } from "./core/header/header.component";
import { PatientSearchModule } from "./core/patient-search/patient-search.module";
import { NumberDirective } from "./directives/number.directive";
import { ApplicationPipeModule } from "./application-pipes/applicationpipes.module";
import { DialogOverviewExampleDialog } from "./authentication/signin/signin.component";
import {
  MenuComponent,
  HeaderComponent,
  // SidebarComponent,
  FooterComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from "./core";

import {
  HashLocationStrategy,
  LocationStrategy,
  CommonModule
} from "@angular/common";

import { AppBaseService } from "./services/http.service";
import { ConfirmDialogComponent } from "./core/confirm-dialog/confirm-dialog.component";
import { ConfirmDynamicDialogComponent } from "./core/confirm-dynamic-dialog/confirm-dynamic-dialog.component";
import { UploadFileDialogComponent } from "./core/upload-file-dialog/upload-file-dialog.component";
import { ConfirmRemarkComponent } from "./core/remark-dialog/remark-dialog.component";
import { CancelDialogComponent } from "./core/cancel-dialog/cancel-dialog.component";
import { DataService } from "./services/data.service";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { ElasticService } from "./services/elastic.service";
import { ToastrModule } from "ngx-toastr";
import { UiConfigService } from "../app/ui-configuration/ui-config.service";
import { EnvServiceProvider } from "./services/env.service.provider";
import { PaymentDialogComponent } from "./core/payment-dialog/payment-dialog.component";
import { SocketService } from "./services/socket.service";
import { InfoDynamicDialogComponent } from './core/info-dynamic-dialog/info-dynamic-dialog.component';
import { IntakeOutputComponent } from './core/intake-output/intake-output.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    // SidebarComponent,
    FooterComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    settingsDialog,
    profileDialog,
    unitDialog,
    ConfirmDialogComponent,
    ConfirmDynamicDialogComponent,
    UploadFileDialogComponent,
    ConfirmRemarkComponent,
    NumberDirective,
    CancelDialogComponent,
    SigninComponent,
    LockscreenComponent,
    SignupComponent,
    ForgotComponent,
    DashboardComponent,
    InfoDialogComponent,
    DialogOverviewExampleDialog,
    NotFoundComponent,
    PaymentDialogComponent,
    InfoDynamicDialogComponent,
    IntakeOutputComponent
  ],
  imports: [
    RouterModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LoadingBarHttpModule,
    NgbModule.forRoot(),
    // SidebarModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: "YOURAPIKEY" }),
    NgxEchartsModule,
    CommonModule,
    ApplicationPipeModule,
    PatientSearchModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: false,
      closeButton: true,
      disableTimeOut: false,
      progressBar: true,
      progressAnimation: "increasing"
      //positionClass: "toast-top-center"
    }),
    PushNotificationModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuardGuard,
    AppserviceService,
    SearchService,
    AuthService,
    DataService,
    ElasticService,
    UiConfigService,
    PatientService,
    EnvServiceProvider,
    ApplicationConfigService,
    SocketService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    settingsDialog,
    profileDialog,
    unitDialog,
    ConfirmDialogComponent,
    ConfirmDynamicDialogComponent,
    UploadFileDialogComponent,
    ConfirmRemarkComponent,
    CancelDialogComponent,
    InfoDialogComponent,
    DialogOverviewExampleDialog,
    PaymentDialogComponent,
    InfoDynamicDialogComponent,
    IntakeOutputComponent
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  public static forRoot(environment: any): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [
        AppBaseService,
        {
          provide: "env", // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
