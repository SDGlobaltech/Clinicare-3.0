import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface ConfirmDynamicDialogData {
  confirm: string;
  displayText: string;
}

@Component({
  selector: "app-dynamic-confirm-dialog",
  templateUrl: "./confirm-dynamic-dialog.component.html",
  styleUrls: ["./confirm-dynamic-dialog.component.scss"]
})
export class ConfirmDynamicDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDynamicDialogData
  ) {}

  ngOnInit() {}

  buttonClick(value) {
    let data = { confirm: value };
    this.dialogRef.close(data);
  }
}
