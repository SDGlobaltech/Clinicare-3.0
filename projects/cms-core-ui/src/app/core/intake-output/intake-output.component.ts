import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelect, MatTableDataSource, MatOptionSelectionChange } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-intake-output',
  templateUrl: './intake-output.component.html',
  styleUrls: ['./intake-output.component.scss']
})
export class IntakeOutputComponent implements OnInit {

  animal: string;
  name: string;
 
  constructor(public dialogRef: MatDialogRef<IntakeOutputComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData) { }

  ngOnInit() {
  }
  
  onNoClick(): void {
    this.dialogRef.close();  
  }

  iolist = [
    {
      time: "07:00 AM",
      qualifiers: "Oral",
      name: "Carry Over",
      value: "ml",
      amount: "1000",
      urine: "200",
      ngaspirate: "",
      drains: "yes",
      drool: "no",
    },
    {
      time: "08:00 AM",
      qualifiers: "Oral",
      name: "Carry Over",
      value: "ml",
      amount: "1000",
      urine: "200",
      ngaspirate: "",
      drains: "yes",
      drool: "no",
    },
    {
      time: "09:00 AM",
      qualifiers: "Oral",
      name: "Carry Over",
      value: "ml",
      amount: "1000",
      urine: "200",
      ngaspirate: "",
      drains: "yes",
      drool: "no",
    },
    {
      time: "10:00 AM",
      qualifiers: "Oral",
      name: "Carry Over",
      value: "ml",
      amount: "1000",
      urine: "200",
      ngaspirate: "",
      drains: "yes",
      drool: "no",
    },
    {
      time: "11:00 AM",
      qualifiers: "Oral",
      name: "Carry Over",
      value: "ml",
      amount: "1000",
      urine: "200",
      ngaspirate: "",
      drains: "yes",
      drool: "no",
    },
    {
      time: "12:00 PM",
      qualifiers: "Oral",
      name: "Carry Over",
      value: "ml",
      amount: "1000",
      urine: "200",
      ngaspirate: "",
      drains: "yes",
      drool: "no",
    },
  ]

}
