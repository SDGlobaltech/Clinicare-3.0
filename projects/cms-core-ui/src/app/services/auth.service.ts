import { Injectable, Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import localForage from "localforage";

@Injectable()
export class AuthService {
  protected headers: Headers;
  protected options: RequestOptions;

  constructor(private http: Http, @Inject("env") private env) {
    this.options = new RequestOptions({ headers: this.headers });
  }

  getData() {
    return localForage.getItem("auth-data");
  }

  getUser() {
    return localForage.getItem("auth-data");
  }

  getUnit() {
    return localForage.getItem("unit");
  }

  getRole() {
    return localForage.getItem("role");
  }
  getSchedule() {
    return localForage.getItem("schedule");
  }

  getUnitList() {
    return new Promise((resolve, reject) => {
      resolve(
        localForage.getItem("auth-data").then(function(data: any) {
          return data.userUnitList;
        })
      );
    });
  }

  getSubDepartList() {
    return new Promise((resolve, reject) => {
      resolve(
        localForage.getItem("auth-data").then(function(data: any) {
          return data.userStations;
        })
      );
    });
  }

  getStoreList() {
    return new Promise((resolve, reject) => {
      resolve(
        localForage.getItem("auth-data").then(function(data: any) {
          return data.userStationMap && data.userStationMap.STORE
            ? data.userStationMap.STORE
            : [];
        })
      );
    });
  }

  getRoleList() {
    return new Promise((resolve, reject) => {
      resolve(
        localForage.getItem("auth-data").then(function(data: any) {
          return data.userUnitRoleList;
        })
      );
    });
  }

  getMenuList() {
    let _this = this;
    return new Observable<boolean>(observer => {
      _this.getRole().then(function(role: any) {
        if (role) {
          const url = `${_this.env.BASE_URL}` + "/id-service/roles/" + role.id;
          _this.http
            .get(url, _this.options)
            .pipe(map((res: Response) => res.json()))
            .subscribe(data => {
              observer.next(data);
            });
        }
      });
    });
  }

  getScheduleList() {
    let _this = this;
    return new Observable<boolean>(observer => {
      _this.getSchedule().then(function(data: any) {
        return data;
      });
    });
  }
}
