import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

/**
 * 
 */
@Component({
  selector: 'app-show-all-push-notification',
  templateUrl: './show-all-push-notification.component.html',
  styleUrls: ['./show-all-push-notification.component.scss']
})
export class ShowAllPushNotificationComponent implements OnInit {

  /**
   *
   * @param dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<ShowAllPushNotificationComponent>,
  ) { }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   *
   */
  onNoClick() {
    this.dialogRef.close({
      triageOperation: false
    });
  }
}
