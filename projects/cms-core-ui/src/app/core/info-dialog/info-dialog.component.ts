import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  confirm: string;
  info: string;
}

@Component({
  selector: "app-info-dialog",
  templateUrl: "./info-dialog.component.html",
  styleUrls: ["./info-dialog.component.scss"]
})
export class InfoDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  

  ngOnInit() {}

  buttonClick(value) {
    let data = { confirm: value };
    this.dialogRef.close(data);
  }
}
