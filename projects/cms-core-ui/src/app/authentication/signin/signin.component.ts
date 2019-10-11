import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppBaseService } from "../../services/http.service";
import { Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatSnackBar } from "@angular/material";
import { authProperties } from "../../authentication/authentication-properties";
import { AuthService } from "./../../services/auth.service";
import { EnvoirnmentService } from "./../../services/envoirnment.service";
import localForage from "localforage";

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  animal: string;
  backgroundImage: string;
  name: string;
  public form: FormGroup;
  public adminName: string;
  public password: string;
  public tokenReturn: any;
  public errorMessage;
  public invalidUser;
  public createOrforget: boolean;
  public sentornotfound: boolean;
  create = "C";
  forget = "F";
  sent = "S";
  notfound = "N";
  urlData: any;
  orgId: any;
  orgUnitId: any;
  deptId: any;
  message: string;
  passcode: string;
  hide = true;
  username: any;
  enterusername: any;
  firsttimepasscode: any;
  enterpassword: any;
  enterpasscode: any;
  emailid: any;
  enteremailID: any;
  emailnotfound: any;
  verificationemail: any;
  passcodePin: string = "";
  process: boolean = false;
  LoginBackgroundImage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private baseservice: AppBaseService,
    public authService: AuthService,
    private env: EnvoirnmentService //@Inject("env") private env
  ) {
    this.orgId = 1;
    this.orgUnitId = 1;
    this.deptId = 1;

    // mapping place holder to ts
    this.username = authProperties.username;
    this.passcode = authProperties.passcode;
    this.enterusername = authProperties.enterusername;
    this.firsttimepasscode = authProperties.firsttimepasscode;
    this.enterpassword = authProperties.enterpassword;
    this.enterpasscode = authProperties.enterpasscode;
    this.emailid = authProperties.emailid;
    this.enteremailID = authProperties.enteremailID;
    this.emailnotfound = authProperties.emailnotfound;
    this.verificationemail = authProperties.verificationemail;
    this.backgroundImage = authProperties.backgroundImage;

    this.LoginBackgroundImage = env.loginImage;
  }

  ngOnInit() {
    let isLoggedin = localStorage.getItem("isLoggedin");
    if (isLoggedin != null && isLoggedin == "true") {
      localStorage.removeItem("passcode");
      this.router.navigate(["Dashboard/dash"]);
    } else {
      localForage.config({
        driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
        name: "localforage",
        version: 1.0,
        size: 9999999999, // Size of database, in bytes. WebSQL-only for now.
        storeName: "keyvaluepairs", // Should be alphanumeric, with underscores.
        description: "Medcare WebSQL Database"
      });
      localForage.clear();
      this.form = this.fb.group({
        uname: [null, Validators.compose([Validators.required])],
        password: [null, Validators.compose([Validators.required])]
      });
    }
  }

  loginMethod(pin) {
    try {
      if (pin.length == 8) {
        this.process = true;
        this.baseservice.setResourceURL("/id-service/");
        this.baseservice
          .postResource("users/login", {
            passCode: pin
          })
          .subscribe(data => {
            this.baseservice
              .getResource("roles/" + data.userUnitRoleList[0].role.id)
              .subscribe(roleData => {
                let unit = roleData.roleUnitMapper[0];
                if (unit) {
                  let unitRole: any = roleData;
                  data["userUnitList"] = roleData.roleUnitMapper;
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
                  localStorage.setItem("roleName", btoa(unitRole.roleName));
                  let _this = this;
                  localForage.setItem("auth-data", data, function(err) {
                    localStorage.setItem("lan", "en");
                    localStorage.setItem("passcode", "true");
                    localStorage.setItem("isLoggedin", "true");
                    _this.router.navigate(["Dashboard/dash"]);
                  });
                }
              });
            this.process = false;
          });
      }
    } catch (ex) {
      this.process = false;
      this.invalidLogin();
    }
  }

  invalidLogin() {
    this.snackBar.open("Login Failed", "Invalid PIN Credential", {
      duration: 1000
    });
    this.passcodePin = "";
  }

  numberClick(number) {
    this.passcodePin = this.passcodePin + number;
    //this.loginMethod(this.passcodePin);
  }

  clearNumber() {
    this.passcodePin = "";
  }

  dilogCreatePasscode() {
    this.createOrforget = true;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "400px",
      height: "auto",
      data: {
        create: this.create,
        forget: this.forget,
        createOrforget: this.createOrforget
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }

  dilogForgetPasscode() {
    this.createOrforget = false;

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "400px",
      height: "auto",
      data: {
        create: this.create,
        forget: this.forget,
        createOrforget: this.createOrforget
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }

  dialogForgetEmail(val) {
    // // debugger;
    if (val == "sonali@sdglobaltech.com") {
      this.sentornotfound = true;
    } else {
      this.sentornotfound = false;
    }

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "400px",
      height: "auto",
      data: {
        sent: this.sent,
        notfound: this.notfound,
        sentornotfound: this.sentornotfound
      }
    });
  }
}
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "create-passcode.html",
  styleUrls: ["./signin.component.scss"]
})
export class DialogOverviewExampleDialog {
  createOrforget: string;
  username: string;
  passcode: string;
  enterusername: any;
  firsttimepasscode: any;
  enterpassword: any;
  enterpasscode: any;
  confirmpasscode: any;
  emailid: any;
  enteremailID: any;
  emailnotfound: any;
  verificationemail: any;
  usernameValue: any;
  passwordValue: any;
  passcodeValue: any;
  passcodeConfirmValue: any;
  pinValue: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private baseservice: AppBaseService
  ) {
    this.username = authProperties.username;
    this.passcode = authProperties.passcode;
    this.enterusername = authProperties.enterusername;
    this.firsttimepasscode = authProperties.firsttimepasscode;
    this.enterpassword = authProperties.enterpassword;
    this.enterpasscode = authProperties.enterpasscode;
    this.confirmpasscode = authProperties.confirmpasscode;
    this.emailid = authProperties.emailid;
    this.enteremailID = authProperties.enteremailID;
    this.emailnotfound = authProperties.emailnotfound;
    this.verificationemail = authProperties.verificationemail;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetData() {
    this.enterusername.reset();
    this.enterpasscode.reset();
    this.confirmpasscode.reset();
  }

  focusOut() {
    let obj = {
      username: this.usernameValue,
      password: this.passwordValue
    };
    this.baseservice.setResourceURL("/id-service/");
    this.baseservice.postResource("users/getUserPin", obj).subscribe(data => {
      this.pinValue = data;
    });
  }

  saveData() {
    if (this.passcodeValue == this.passcodeConfirmValue) {
      let obj = {
        password: this.passwordValue,
        passCode: this.passcodeValue,
        username: this.usernameValue
      };
      this.baseservice.setResourceURL("/id-service/");
      this.baseservice.putResource("users/pin", obj).subscribe(data => {
        this.onNoClick();
      });
    }
  }
}
