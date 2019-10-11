import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {take} from "rxjs/operators";
import {ShowAllPushNotificationComponent} from "../../shared/dialog/show-all-push-notification/show-all-push-notification.component";

/**
 *
 */
@Component({
  selector: 'app-push-notification-list',
  templateUrl: './push-notification-list.component.html',
  styleUrls: ['./push-notification-list.component.scss']
})
export class PushNotificationListComponent implements OnInit {
  /**
   *
   */
  constructor(
    private dialog: MatDialog,
  ) { }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   *
   */
  showAllPushNotification() {
    const dialogRef = this.dialog.open(ShowAllPushNotificationComponent, {
      width:  "900px",
      data: { }
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(result => {
          console.log(result);
      });
  }
}
