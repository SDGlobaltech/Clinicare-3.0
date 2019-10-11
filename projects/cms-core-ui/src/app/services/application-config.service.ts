import { Injectable } from "@angular/core";
import { AppBaseService } from "./http.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApplicationConfigService {
  moduleConfigurationList: ModuleConfiguration[];
  screenConfigurationList: ScreenConfiguration[];
  screenConfiguration = {
    listOfResources: []
  };

  constructor(private httpService: AppBaseService) {}

  getModuleConfiguration(moduleName: string, keyName?: string) {
    return new Observable(observer => {
      let list = this.moduleConfigurationList;
      if (list && list.length > 0) {
        observer.next(this.moduleConfigurationList);
      } else {
        let unitCode = atob(localStorage.getItem("unitCode"));
        let orgCode = atob(localStorage.getItem("orgCode"));
        this.httpService.setResourceURL("/appconfig-service/");
        return this.httpService
          .getResource(
            "appConfiguration/findConfigByModule?unitCode=" +
              unitCode +
              "&orgCode=" +
              orgCode +
              "&moduleName=" +
              moduleName
          )
          .subscribe(response => {
            if (response && response.keys) {
              this.moduleConfigurationList = response.keys;
              observer.next(this.moduleConfigurationList);
            }
          });
      }
    });
  }

  getScreenConfiguration(
    moduleName: string,
    subModuleName: string,
    subModuleChildName?: string,
    keyName?: string
  ) {
    return new Observable(observer => {
      let unitCode = atob(localStorage.getItem("unitCode"));
      let orgCode = atob(localStorage.getItem("orgCode"));
      let configurationKeys = this.getKeyList(moduleName, subModuleName);

      if (configurationKeys && configurationKeys.length == 0) {
        this.httpService.setResourceURL("/appconfig-service/");
        this.httpService
          .postResource("screenAppConfig/advancedSearch", {
            unitCode: unitCode,
            orgCode: orgCode,
            moduleName: moduleName,
            submodule: subModuleName,
            submoduleChild: subModuleChildName ? subModuleChildName : "",
            groupName: "",
            key: keyName? keyName: ""
          })
          .subscribe(response => {
            let screenConfigurationList = [];
            if (response && response.listOfResources) {
              this.screenConfiguration = response;
              screenConfigurationList = this.getKeyList(
                moduleName,
                subModuleName
              );
            }
            observer.next(screenConfigurationList);
          });
      } else {
        observer.next(configurationKeys);
      }
    });
  }

  getKeyList(moduleName: string, subModuleName: string): any[] {
    let configurationKeys = [];
    if (this.screenConfiguration.listOfResources.length > 0) {
      let configuration: any = this.screenConfiguration.listOfResources.filter(
        i => i.module == moduleName
      );
      if (configuration && configuration.length > 0 && configuration[0].keys) {
        configurationKeys = configuration[0].keys.filter(
          i => i.submodule == subModuleName
        );
      }
    }

    return configurationKeys;
  }
}

export class ModuleConfiguration {
  key: string;
  optionList: [];
  submodule: string;
  type: string;
  url: string;
  valueList: any[];
}

export class ScreenConfiguration {
  groupName: string;
  key: string;
  showInScreen: boolean;
  submodule: string;
  submoduleChild: string;
  systemMandatory: boolean;
  userSelected: boolean;
  validationRegex: string;
}
