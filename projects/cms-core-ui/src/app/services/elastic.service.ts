import { Injectable } from "@angular/core";
import { AppBaseService } from "./../services/http.service";

@Injectable({
  providedIn: "root"
})
export class ElasticService {
  constructor(private baseservice: AppBaseService) {}

  getElastic(objectName: string, text: string) {
    if (objectName != "" && text != "") {
      this.baseservice.setResourceURL("/audit-service/");
      return this.baseservice.getResource(
        "auditTrail/findRawTextByObjectName/" +
          objectName +
          "?input=" +
          text.toLowerCase()
      );
    }
  }
}
