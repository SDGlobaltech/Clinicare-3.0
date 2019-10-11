import { NgModule } from "@angular/core";
import {
  MatNativeDateModule,
  MatDatepickerModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter
} from "@angular/material";
import {
  MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "../application-pipes/moment-date-adapter";

@NgModule({
  declarations: [],
  imports: [MatNativeDateModule, MatDatepickerModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter }
  ]
})
export class MomentDateAdapterModule {}
