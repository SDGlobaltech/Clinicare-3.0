import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule} from "@angular/material";
import {MaterialModule} from "cms-core-ui";
import {PushNotificationComponent} from "./controllers/push-notification/push-notification.component";
import { ShowPushNotificationComponent } from './shared/show-push-notification/show-push-notification.component';
import { PushNotificationListComponent } from './controllers/push-notification-list/push-notification-list.component';
import { ShowAllPushNotificationComponent } from './shared/dialog/show-all-push-notification/show-all-push-notification.component';

/**
 *
 */
@NgModule({
  declarations: [
    PushNotificationComponent,
    ShowPushNotificationComponent,
    PushNotificationListComponent,
    ShowAllPushNotificationComponent,
  ],
  exports: [
    PushNotificationComponent,
    PushNotificationListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  entryComponents: [
    ShowAllPushNotificationComponent
  ]
})
export class PushNotificationModule { }
