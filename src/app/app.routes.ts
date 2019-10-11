import { Routes } from "@angular/router";
import {
  SigninComponent,
  AdminLayoutComponent,
  DashboardComponent,
  AuthGuardGuard,
  NotFoundComponent
} from "cms-core-ui";
import { environment } from "./../environments/environment";
import { PatientConsultationComponent } from "./projects/consultation/patient-consultation/patient-consultation.component";
import { ConsultationModule } from "./projects/consultation/consultation.module";


export const AppRoutes: Routes = [
  {
    path: "",
    component: SigninComponent
  },
  {
    path: "notfound",
    component: NotFoundComponent
  },
  {
    path: "Dashboard",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dash",
        component: DashboardComponent,
        canActivate: [AuthGuardGuard]
      }
    ]
  },
  {
    path: "consultation",
    component: AdminLayoutComponent,
    children: [
          {
            path: "",
            loadChildren: "./projects/consultation/consultation.module#ConsultationModule",
           
          }
        ]
     
  },
];
