import { throwError, Observable } from "rxjs";
import { Injectable, Inject } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { MatSnackBar } from "@angular/material";
import {
  HttpClient,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { EnvoirnmentService } from "../services/envoirnment.service";

import { HttpHeaders } from "@angular/common/http";
@Injectable()
export class AppBaseService implements HttpInterceptor {
  protected resourceUrl: string;
  private baseUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      responseType: "json"
    })
  };

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private toastr: ToastrService,
    private env: EnvoirnmentService //@Inject("env") private env
  ) {
    this.baseUrl = env.apiUrl;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes("integration/token")) {
      const unitId = localStorage.getItem("unitId");
      const orgId = localStorage.getItem("orgId");
      const orgCode = localStorage.getItem("orgCode");
      const unitCode = localStorage.getItem("unitCode");
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      request = request.clone({
        setHeaders: {
          "X-API-VERSION": "1",
          "X-ORGID": atob(orgId),
          "X-ORGCODE": atob(orgCode),
          "X-UNITID": atob(unitId),
          "X-UNITCODE": atob(unitCode),
          "X-USERID": atob(userId),
          "X-USERNAME": atob(userName)
        }
      });
    }
    return next.handle(request).catch(response => {
      this.displayToastMessage(response);
      return throwError(response);
    });
  }

  setAuditTrailAction(action) {
    const roleName = localStorage.getItem("roleName");
    this.httpOptions = {
      headers: new HttpHeaders({
        "X-ACTION": action,
        "X-ROLE": atob(roleName)
      })
    };
  }

  setResourceURL(url) {
    this.resourceUrl = url;
  }

  getExternalResource(externalUrl: string) {
    //const data = this.baseUrl + this.resourceUrl + params;
    return this.http.get(externalUrl).map((res: any) => res);
  }

  getResource(params) {
    //const data = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const data = this.baseUrl + this.resourceUrl + params;
    return this.http.get(data, this.httpOptions).map((res: any) => res);
  }

  postResource(params, payload) {
    //const url = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const url = this.baseUrl + this.resourceUrl + params;
    console.log(url);
    return this.http
      .post(url, payload, this.httpOptions)
      .map((res: any) => res);
  }

  putResource(params, payload) {
    //const url = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const url = this.baseUrl + this.resourceUrl + params;
    return this.http.put(url, payload, this.httpOptions).map((res: any) => res);
  }

  patchResource(params, payload) {
    //const url = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const url = this.baseUrl + this.resourceUrl + params;
    return this.http
      .patch(url, payload, { responseType: "json" })
      .map((res: any) => res);
  }

  deleteResource(params) {
    //const url = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const url = this.baseUrl + this.resourceUrl + params;
    return this.http
      .delete(url, { responseType: "json" })
      .map((res: any) => res);
  }

  postFileResource(params, payload) {
    //const url = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const url = this.baseUrl + this.resourceUrl + params;
    return this.http
      .post(url, payload, { responseType: "blob" as "json" })
      .map((res: any) => {
        return new Blob([res], { type: "application/pdf" });
      });
  }

  getFileResource(params) {
    //const url = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const url = this.baseUrl + this.resourceUrl + params;
    return this.http.get(url, { responseType: "json" }).map((res: any) => res);
  }

  getBlobFileResource(params) {
    //const url = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const url = this.baseUrl + this.resourceUrl + params;
    return this.http
      .get(url, { responseType: "blob" as "json" })
      .map((res: any) => {
        return new Blob([res], { type: "application/pdf" });
      });
  }

  uploadResource(params, payload) {
    //const url = `${this.env.BASE_URL}` + this.resourceUrl + params;
    const url = this.baseUrl + this.resourceUrl + params;
    return this.http
      .post(url, payload, { responseType: "json" })
      .map((res: any) => res);
  }

  displayToastMessage(response) {
    let statusText = response.statusText;
    if (response.status == 0 || response.status >= 300) {
      let message = "Oops something went wrong. Contact Admin";
      if (response.status == 409) {
        statusText = "Server Validation";
        if (response.error.message) message = response.error.message;
        else if (response.error.statusMessage)
          message = response.error.statusMessage;
        else message = response.error;
        this.toastr.info(message, statusText + " (" + response.status + ")");
      } else if (response.status == 401) {
        statusText = "Unauthorized Access";
        message = "Invalid User Credentials";
        this.toastr.info(message, statusText + " (" + response.status + ")");
      } else if (response.status == 503) {
        statusText = "Rule Engine Not Accessible";
        message = "Rule Engine Not Accessible. Contact Admin";
        this.toastr.info(message, statusText + " (" + response.status + ")");
      } else if (response.status == 0) {
        statusText = "Backend Error";
        message = "Please check the logs for more information";
        this.toastr.error(message, statusText + " (" + response.status + ")");
      } else if (response.message) {
        message = response.message;
        this.toastr.error(message, statusText + " (" + response.status + ")");
      } else {
        this.toastr.error(message, statusText + " (" + response.status + ")");
      }
    }
  }
}
