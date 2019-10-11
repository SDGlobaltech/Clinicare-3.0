import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EnvoirnmentService {
  public apiUrl = "";
  public enableDebug = true;
  public loginImage = "";
  public medcareVerison = "";
  public clinicareUrl = "";
  public socketUrl = "";
  constructor() {}
}
