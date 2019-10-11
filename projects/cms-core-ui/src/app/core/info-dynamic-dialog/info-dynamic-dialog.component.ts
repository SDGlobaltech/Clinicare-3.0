import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-dynamic-dialog',
  templateUrl: './info-dynamic-dialog.component.html',
  styleUrls: ['./info-dynamic-dialog.component.scss']
})
export class InfoDynamicDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InfoDynamicDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: infoDynamicDialogData
  ) {
   }

  ngOnInit() {
  }

  buttonClick(value) {
    let data = { confirm: value };
    this.dialogRef.close(data);
  }

  routeButtonClick(){
    this.router.navigateByUrl(this.data.redirectPageText);
  }

}

export interface infoDynamicDialogData {
  confirm: string;
  displayText: string;
  redirectPageText: string;
  infoText: any;
}
