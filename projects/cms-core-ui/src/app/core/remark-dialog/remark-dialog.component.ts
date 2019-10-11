import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface RemarkDialogData {
  confirm: string;
  remark: string;
}

@Component({
  selector: "app-remark-dialog",
  templateUrl: "./remark-dialog.component.html",
  styleUrls: ["./remark-dialog.component.scss"]
})
export class ConfirmRemarkComponent implements OnInit {
  public remarkValue: any = "";
  constructor(
    public dialogRef: MatDialogRef<ConfirmRemarkComponent>,
    @Inject(MAT_DIALOG_DATA) data: RemarkDialogData
  ) {}

  ngOnInit() {}

  SaveRemarks(value) {
    let data = { confirm: value, remark: this.remarkValue };
    this.dialogRef.close(data);
  }
  onNoClick() {
    let data = { confirm: "No", remark: "" };
    this.dialogRef.close(data);
  }
}
