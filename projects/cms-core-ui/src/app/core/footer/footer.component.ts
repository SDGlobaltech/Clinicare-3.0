import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { EnvoirnmentService } from "../../services/envoirnment.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent {
  footerDate = new Date();
  medcareVersion: String;
  constructor(
    public translate: TranslateService,
    private env: EnvoirnmentService
  ) {
    this.medcareVersion = env.medcareVerison;
  }
}
