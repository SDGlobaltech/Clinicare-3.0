import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./../../modules/material.module";
import { PatientSearchComponent } from "./patient-search.component";

@NgModule({
  declarations: [PatientSearchComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PatientSearchComponent]
})
export class PatientSearchModule {}
