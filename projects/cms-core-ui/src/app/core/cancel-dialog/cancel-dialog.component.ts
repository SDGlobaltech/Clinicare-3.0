import { Component, OnInit, Inject } from "@angular/core";
import { AppBaseService } from "../../services/http.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface CancelDialogData {
  confirm: string;
  remark: string;
}

@Component({
  selector: "app-cancel-dialog",
  templateUrl: "./cancel-dialog.component.html",
  styleUrls: ["./cancel-dialog.component.scss"]
})
export class CancelDialogComponent implements OnInit {
  //Variables
  public remarkValue: any = "";
  public reasons = [
    { id: "1", desc: "Incorrect Amount Entry" },
    { id: "2", desc: "Incorrect Discount Entry" },
    { id: "3", desc: "Invalid Entry Data" },
    { id: "4", desc: "other" }
  ];
  public reasonId: any;
  public name: any;
  comments: String = "";
  isOther: Boolean = false;

  constructor(
    private AppBaseService: AppBaseService,
    public dialogRef: MatDialogRef<CancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: CancelDialogData
  ) {}

  ngOnInit() {}

  getRemark() {
    if (this.remarkValue == "other") {
      this.isOther = true;
    } else {
      this.isOther = false;
    }
  }

  SaveRemarks(value) {
    let data: any;
    if (this.remarkValue != "other") {
      data = { confirm: value, remark: this.remarkValue };
    } else {
      data = { confirm: value, remark: this.comments };
    }
    this.dialogRef.close(data);
  }
  onNoClick() {
    let data = { confirm: "No", remark: "" };
    this.dialogRef.close(data);
  }

  buttonClick() {
    let data = { confirm: "No", remark: "" };
    this.dialogRef.close(data);
  }
}
