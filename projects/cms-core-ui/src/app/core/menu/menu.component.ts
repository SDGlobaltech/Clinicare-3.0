import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AppBaseService } from "../../services/http.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
  providers: [AuthService]
})
export class MenuComponent implements OnInit {
  currentLang = "en";
  public menuList: any = [];
  activeUrl: string;
  menuId: any;
  nursing: string;
  passcode: any;
  parentMenuName: string = "";
  parentMenuIcon: string = "";

  constructor(
    public translate: TranslateService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public baseservice: AppBaseService
  ) {
    this.route.queryParams.subscribe(params => {
      this.menuId = params["menuId"];
      this.nursing = params["nursing"];
    });
  }

  ngOnInit() {
    let routingURL = this.router.url;
    if (routingURL) {
      let parentMenuUrl = routingURL.split("/")[1];
      if (parentMenuUrl) {
        this.getMenus(parentMenuUrl);
      }
    }
  }

  getMenus(parentMenuUrl) {
    let _this = this;
    let displayList = [];
    _this.authService.getRole().then(function(role: any) {
      _this.baseservice.setResourceURL("/id-service/");
      _this.baseservice.getResource("roles/" + role.id).subscribe(data => {
        if (data) {
          let menuList = data.roleMenuPermissions;
          if (menuList) {
            //Sort menu as per sequence
            menuList = menuList.sort(
              (a, b) =>
                parseFloat(a.menu.sequenceOrder) -
                parseFloat(b.menu.sequenceOrder)
            );

            //Get the parent menu
            let menus = [];
            if (parentMenuUrl) {
              let parentMenu: any;
              let menuData = menuList.find(
                i => i.menu.location == parentMenuUrl
              );
              parentMenu = menuData ? menuData.menu : null;
              if (parentMenu) {
                _this.parentMenuName = parentMenu.displayText;
                _this.parentMenuIcon = parentMenu.icon;
                menus = menuList.filter(i => i.menu.parentid == parentMenu.id);
              }
            }
            if (menus.length > 0) {
              menus.forEach(child => {
                let children;
                let subChildren = [];
                let subChildrenList = menuList.filter(
                  i => i.menu.parentid == child.menu.id
                );
                subChildrenList.forEach(subchild => {
                  subChildren.push({
                    id: subchild.menu.id,
                    displayText: subchild.menu.displayText,
                    icon: subchild.menu.icon,
                    children: [],
                    parent: subchild.menuId,
                    location: subchild.menu.location,
                    index: 0,
                    sequence: subchild.menu.sequenceOrder
                  });
                });
                children = {
                  id: child.menu.id,
                  displayText: child.menu.displayText,
                  icon: child.menu.icon,
                  children: subChildren,
                  parent: child.menuId,
                  location: child.menu.location,
                  variable: child.menu.variablename,
                  index: 0,
                  sequence: child.menu.sequenceOrder
                };

                displayList.push(children);
              });
            } else {
              _this.router.navigate(["/Dashboard/dash"]);
            }
            _this.menuList = displayList;
          }
        }
      });
    });
  }
}
