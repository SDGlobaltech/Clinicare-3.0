import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "demo-app";
  loadBilling = true;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private snackBar: ToastrService
  ) {
    try {
      this.router.errorHandler = (error: any) => {
        // this.router
        //   .navigate([
        //     "/notfound",
        //     { errorMessage: error.message ? error.message : error }
        //   ])
        //   .catch(error => {
        //     console.log(error);
        //   }); // or redirect to default route
        let errorName: string = error.name;
        let errorMessage: string = error.message;
        if (errorMessage.includes("Cannot match any routes"))
          errorName =
            "Page/Module not found. Please make sure this Page/Module is part of your application";
        this.snackBar.error(errorName, errorMessage);
        if (errorMessage.includes("chunk")) window.location.reload(true);
      };
    } catch (ex) {
      console.log(ex);
    }
  }

  getSelectedLanguage() {
    let selectedLanguage = localStorage.getItem("lan");
    let browserLang: string = this.translate.getBrowserLang();
    return selectedLanguage ? selectedLanguage : browserLang;
  }
}
