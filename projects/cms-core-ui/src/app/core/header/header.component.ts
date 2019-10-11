import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  Inject
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SearchService } from "../../services/search.service";
import { AppBaseService } from "../../services/http.service";
import { EnvoirnmentService } from "../../services/envoirnment.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";
import { properties } from "./header.properties";
import { AuthService } from "./../../services/auth.service";
import { DatePipe } from "@angular/common";
import localForage from "localforage";
import { Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [AuthService, DatePipe]
})
export class HeaderComponent implements OnInit {
  loginName: any;
  units: any;
  masterHeaderUnit: any;
  userTypeName: any;
  unitName: any;
  unitCode: any;
  isVisible: boolean = false;
  error: any = { isError: false, errorMessage: "" };
  minDate: Date;
  selected: string = localStorage.getItem("lan");
  @Input() heading: string;
  @Input() subheading: string;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() openSearch = new EventEmitter<void>();
  @Output() toggleFullscreen = new EventEmitter<void>();
  searchList: any[] = [];
  menuList: any = [];
  public dropdownValues: any = {};
  public moreMenu = false;
  public properties: any = properties;
  isPageLoad = true;
  corporationObj: string;
  corporations: any[] = ["t1", "t2"];
  queryUnitCode: any;
  queryPasscode: string;
  controls: any[];
  saveFilter: boolean = false;
  moduleList: any[];
  searchValue: string = "";
  public isTyped = false;

  constructor(
    private router: Router,
    private searchService: SearchService,
    public baseservice: AppBaseService,
    public dialog: MatDialog,
    public authService: AuthService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private env: EnvoirnmentService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["unitCode"]) {
        this.queryUnitCode = atob(params["unitCode"]);
      }
      if (params["passcode"]) {
        this.queryPasscode = atob(params["passcode"]);
      }
    });
  }

  public menuImg: any = [
    "home",
    "opd",
    "doctor",
    "lab",
    "billing",
    "master",
    "emergency"
  ];

  ngOnInit() {
    this.manageLoginData();
    this.initSearch();
    // this.router.routeReuseStrategy.shouldReuseRoute = function() {
    //   return false;
    // };
  }

  manageLoginData() {
    try {
      const _this = this;
      this.authService.getData().then(function(user: any) {
        if (user) {
          _this.loginName = user.name;
          //let units = user.userUnitList;
          _this.authService.getUnitList().then(function(units: any) {
            if (units && units.length > 0) {
              _this.units = units;
              _this.authService.getUnit().then(function(unit: any) {
                if (unit) {
                  let defaultUnit = units.find(
                    i => i.unitCode == unit.unitCode
                  );
                  if (!defaultUnit) defaultUnit = units[0];
                  if (defaultUnit) {
                    _this.masterHeaderUnit = defaultUnit.unitCode;
                    _this.unitName = defaultUnit.unitName;
                    _this.unitCode = defaultUnit.unitCode;
                  }
                }
              });
              _this.authService.getRole().then(function(role: any) {
                if (role) {
                  _this.userTypeName = role.roleName;
                  _this.getAllMenu(role.id);
                }
              });
            } else if (this.queryPasscode) {
              _this.routeLogin(this.queryPasscode);
            } else {
              _this.signout();
            }
          });
        }
      });
    } catch (ex) {
      this.signout();
    }
  }

  routeLogin(passcode) {
    this.baseservice.setResourceURL("/id-service/");
    this.baseservice
      .postResource("users/login", {
        passCode: passcode
      })
      .subscribe(data => {
        localStorage.setItem("lan", "en");
        localStorage.setItem("passcode", passcode);
        localStorage.setItem("isLoggedin", "true");

        let roles = [];
        data.userUnitRoleList.forEach(element => {
          roles.push({
            id: element.role.id,
            roleName: element.role.roleName,
            roleCode: element.role.roleCode,
            unitId: element.unitId
          });
        });
        data.userUnitRoleList = roles;
        let unit;
        let queryUnitCode = this.queryUnitCode;
        if (!queryUnitCode) {
          unit = data.userUnitList.find(function check(data) {
            return data.isDefault;
          });
        } else {
          unit = data.userUnitList.find(function check(data) {
            return data.unitCode == queryUnitCode;
          });
        }
        if (unit) {
          let unitRole: any = roles.find(i => i.unitCode == unit.unitCode);
          data["userUnitRole"] = null;
          data["userUnit"] = null;
          localForage.setItem("unit", unit);
          localForage.setItem("role", {
            id: unitRole.id,
            roleName: unitRole.roleName,
            roleCode: unitRole.roleCode
          });
          localStorage.setItem("userId", btoa(data.userId));
          localStorage.setItem("userName", btoa(data.userName));
          localStorage.setItem("unitId", btoa(unit.unitId));
          localStorage.setItem("orgId", btoa(unit.orgId));
          localStorage.setItem("unitCode", btoa(unit.unitCode));
          localStorage.setItem("orgCode", btoa(unit.orgCode));
          localForage.setItem("auth-data", data, function(err) {
            window.location.reload();
          });
        }
      });
  }

  unitChange() {
    try {
      const _this = this;
      let unit = this.units.find(i => i.unitCode == this.masterHeaderUnit);
      if (unit) {
        this.authService.getData().then(function(data: any) {
          if (data && data.userUnitRoleList) {
            let unitRole: any = data.userUnitRoleList.find(
              i => i.unitCode == unit.unitCode
            );
            if (unitRole) {
              localForage.setItem("role", {
                id: unitRole.id,
                roleName: unitRole.roleName,
                roleCode: unitRole.roleCode
              });
            }
          }

          localStorage.setItem("unitId", btoa(unit.unitId));
          localStorage.setItem("orgId", btoa(unit.orgId));
          localStorage.setItem("unitCode", btoa(unit.unitCode));
          localForage.setItem("unit", unit).then(function(value: any) {
            _this.unitName = unit.unitName;
            _this.unitCode = unit.unitCode;
            _this.authService.getRole().then(function(role: any) {
              if (role) {
                _this.userTypeName = role.roleName;
                window.location.reload();
              } else {
                _this.signout();
              }
            });
          });
        });
      }
    } catch (ex) {
      this.signout();
    }
  }

  initSearch() {
    try {
      this.searchService.getSearch.subscribe(list => {
        if (
          list &&
          list.length > 0 &&
          list[0].controls.length > 0 &&
          list[0].controls[0] &&
          list[0].controls[0].type == "radio" &&
          list[0].controls[0].radios
        ) {
          this[list[0].controls[0].name] = list[0].controls[0].radios[0].value;
        }

        let pageName = this.router.url.split("?")[0];
        if (
          localStorage.getItem("filter" + pageName) != undefined &&
          localStorage.getItem("filter" + pageName) != null &&
          localStorage.getItem("filter" + pageName) != ""
        ) {
          let data = JSON.parse(localStorage.getItem("filter" + pageName));
          if (list && list.length > 0) {
            list.forEach(element => {
              element.controls.forEach(control => {
                this[control.name] = data[control.name];
              });
            });
            this.saveFilter = true;
            this.setSearch(data);
          }
        } else {
          this.saveFilter = false;
          this.clearSearch();
        }

        this.searchList = list;
      });
    } catch (ex) {}
  }

  selectOnChange(name, value) {
    if (name && value) this.dropdownValues[name] = value.id;
  }

  radioOnClick(radio) {
    this.baseservice.setResourceURL("/");
    this.baseservice.getResource(radio.url).subscribe(data => {
      if (data[0].uiConfig != null) {
        this.searchList = [];
        data[0].uiConfig.forEach(element => {
          let controlList = [];
          element.controls.forEach(control => {
            controlList.push({
              type: control.type,
              placeholder: this.properties.placeholder[control.placeholder],
              value: "",
              column: control.column,
              name: control.name,
              url: control.url ? control.url : "",
              selectType: "",
              radios: control.radios ? control.radios : []
            });
          });
          this.searchList.push({ controls: controlList });
        });
      }
    });
  }

  selectOnClick(control, parent, child) {
    let _this = this;
    try {
      let value = "";
      let hasParam = false;
      if (
        control.url &&
        control.url.includes("{") &&
        control.url.includes("{") &&
        !control.url.includes("{UnitMaster}")
      ) {
        let param = control.url.substring(
          control.url.lastIndexOf("{") + 1,
          control.url.lastIndexOf("}")
        );
        if (this.dropdownValues[param]) {
          control.url = control.url.replace(
            /\{.*?\}/,
            this.dropdownValues[param].trim()
          );
        } else {
          control.url = control.url.replace(/\{.*?\}/, "''");
        }
        hasParam = true;
      } else if (control.methodName && control.methodName == "localForage") {
        if (control.name == "store") {
          let list = [];
          this.authService.getStoreList().then(function(stores: any) {
            stores.forEach(element => {
              list.push({
                id: element.stationId,
                code: element.stationCode,
                desc: element.stationName
              });
            });
            if (!_this.searchList[parent].controls[child].options) {
              _this.searchList[parent].controls[child].options = list;
              if (hasParam) document.getElementById(control.name).click();
              hasParam = false;
            }
          });
        } else if (control.name == "unit") {
          let list = [];
          this.authService.getUnitList().then(function(stores: any) {
            stores.forEach(element => {
              list.push({
                id: element.id,
                code: element.unitCode,
                desc: element.unitName
              });
            });
            if (!_this.searchList[parent].controls[child].options) {
              _this.searchList[parent].controls[child].options = list;
              if (hasParam) document.getElementById(control.name).click();
              hasParam = false;
            }
          });
        }
      } else if (
        !this.searchList[parent].controls[child].options ||
        this.searchList[parent].controls[child].options.length == 0 ||
        hasParam
      ) {
        if (control.url) {
          this.baseservice.setResourceURL("/");
          this.baseservice.getResource(control.url).subscribe(res => {
            this.searchList[parent].controls[child].options = res;
            setTimeout(function() {
              document.getElementById(control.name).click();
            }, 500);
          });
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  public menuOnClick(data) {
    try {
      if (data.url == "clinicare") {
        let _this = this;
        this.authService.getUser().then(function(data: any) {
          _this.baseservice
            .getExternalResource(
              _this.env.clinicareUrl +
                "/ehr/api/integration/token?access_code=" +
                data.userEmail
            )
            .subscribe(res => {
              window.location.href = res.redirectLink;
            });
        });
      } else {
        if (
          data.children &&
          data.children.length > 0 &&
          data.children[0].children &&
          data.children[0].children.length > 0
        ) {
          this.router.navigate([
            data.parent,
            data.children[0].location,
            data.children[0].children[0].location
          ]);
        } else if (data.children && data.children.length > 0) {
          this.router.navigate([data.parent, data.children[0].location]);
        } else {
          this.router.navigate([data.parent]);
        }
        //localStorage.setItem("activeMenu", btoa(data.menuid));
      }
    } catch (ex) {}
  }

  public getAllMenu(roleid: string) {
    const _this = this;
    this.baseservice.setResourceURL("/id-service/");
    this.baseservice.getResource("roles/" + roleid).subscribe(data => {
      if (data) {
        let menuList = data.roleMenuPermissions;
        let menus = [];
        if (menuList) {
          let parents = menuList.filter(i => i.menu.parentid == "0");
          if (parents) {
            // parents = parents.sort((a, b) =>
            //   a.menu.menuorder.localeCompare(b.menu.menuorder)
            // );
            parents = parents.sort(
              (a, b) => parseFloat(a.menu.sequenceOrder) - parseFloat(b.menu.sequenceOrder)
            );
            parents.forEach(element => {
              let childrenList = menuList.filter(
                i => i.menu.parentid == element.menuId
              );

              let children = [];
              if (childrenList.length > 0) {
                // childrenList = childrenList.sort((a, b) =>
                //   a.menu.menuorder.localeCompare(b.menu.menuorder)
                // );

                let child = childrenList[0];
                let subChildren = [];
                let subChildrenList = menuList.filter(
                  i => i.menu.parentid == childrenList[0].menuId
                );

                if (subChildrenList.length > 0) {
                  let subchild = subChildrenList[0];

                  subChildren.push({
                    displayText: subchild.menu.displayText,
                    icon: subchild.menu.icon,
                    children: [],
                    parent: subchild.menuId,
                    location: subchild.menu.location,
                    index: 0
                  });
                }

                children.push({
                  displayText: child.menu.displayText,
                  icon: child.menu.icon,
                  children: subChildren,
                  parent: element.menuId,
                  location: child.menu.location,
                  index: 0
                });
              }

              menus.push({
                displayText: element.menu.displayText,
                children: children,
                location: element.menu.location,
                icon: element.menu.icon,
                index: element.menu.menuorder,
                menuid: element.menu.id,
                url: element.menu.url,
                module: element.menu.module
              });
            });

            _this.manageMenus(menus);
          }
        }
      }
    });
  }

  manageMenus(menus) {
    this.moduleList = [];
    let modules = menus
      .map(item => item.module)
      .filter((value, index, self) => self.indexOf(value) === index);
    modules.forEach(module => {
      if (module) {
        let i = 1;
        let list = [];
        this.menuList = [];
        let menuList = menus.filter(i => i.module == module);
        menuList.forEach((menu, index) => {
          if (menu) {
            list.push({
              name: menu.displayText,
              image: "../../../assets/images/master-icons/" + menu.icon,
              children: menu.children,
              parent: menu.location,
              index: index,
              menuid: menu.menuid,
              url: menu.url
            });
          }
          if (i == 4 || index == menuList.length - 1) {
            this.menuList.push({ moduleName: module, list: list });
            i = 1;
            list = [];
          } else {
            i++;
          }
        });

        this.moduleList.push({
          moduleName: module,
          menuList: this.menuList
        });
      }
    });
  }

  setSearch(data) {
    if (!data.start) data["start"] = "";
    if (!data.end) data["end"] = "";

    this.searchList.forEach(search => {
      search.controls.forEach(control => {
        if (!data[control.name]) data[control.name] = "";
        if (control.type == "date" && data[control.name])
          data[control.name] = new Date(data[control.name]);
      });
    });

    let pageName = this.router.url.split("?")[0];
    if (this.saveFilter) {
      localStorage.setItem("filter" + pageName, JSON.stringify(data));
    } else {
      this.searchList.forEach(search => {
        search.controls.forEach(control => {
          this[control.name] = "";
        });
      });
      localStorage.setItem("filter" + pageName, "");
    }
    this.searchService.setResult(data);
  }

  private resultSubject = new Subject<any>();
  getResultF = this.resultSubject.asObservable();

  refreshApp() {
    this.router.navigate([this.router.url]);
  }

  clearSearch() {
    this.searchList.forEach(search => {
      search.controls.forEach(control => {
        this[control.name] = "";
      });
    });
  }

  signout() {
    localStorage.clear();
    localForage.clear();
    this.router.navigate([""]);
  }

  selectdata() {
    localStorage.setItem("lan", this.selected);
    this.translate.use(this.selected);
  }

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(settingsDialog, {
      width: "700px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(profileDialog, {
      width: "700px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  openUnitDialog(): void {
    const dialogRef = this.dialog.open(unitDialog, {
      width: "400px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  getKeySearch(data: string) {
    if (data && data.trim() != "") this.searchService.setElasticSearch(data);
  }

  clearText() {
    this.searchValue = "";
    this.isTyped = false;
  }

  showCloseIcon() {
    if (this.searchValue) {
      this.isTyped = true;
    } else {
      this.isTyped = false;
    }
  }

  changeDropArrow() {
    if (this.isVisible) {
      this.isVisible = false;
    } else {
      this.isVisible = true;
    }
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "settings-dialog.html",
  styleUrls: ["./header.component.scss"]
})
export class settingsDialog {
  constructor(
    public dialogRef: MatDialogRef<settingsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  panelOpenState = false;

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "profile-dialog.html",
  styleUrls: ["./header.component.scss"]
})
export class profileDialog {
  constructor(
    public dialogRef: MatDialogRef<profileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  panelOpenState = false;

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "unit-dialog.html"
})
export class unitDialog {
  constructor(
    public dialogRef: MatDialogRef<unitDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  panelOpenState = false;

  onNoClick(): void {
    this.dialogRef.close();
  }
}
