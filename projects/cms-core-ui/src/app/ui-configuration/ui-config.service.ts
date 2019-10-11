import { Injectable } from "@angular/core";
import { throwError as observableThrowError, throwError as _throw } from "rxjs";
import { Inject } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable()
export class UiConfigService {
  constructor(private http: HttpClient, @Inject("env") private env) {}

  getConfigResource() {
    const data =
      "./assets/configuration/" + `${this.env.client_name}` + ".config.json";
    return this.http.get(data, { responseType: "json" }).map((res: any) => res);
  }
}
