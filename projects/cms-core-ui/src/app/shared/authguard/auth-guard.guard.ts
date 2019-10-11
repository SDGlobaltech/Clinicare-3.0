import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../services/auth.service";

@Injectable()
export class AuthGuardGuard implements CanActivate {
  menuId: any;
  passcode: any;
  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  canActivate(): boolean {
    if (
      !localStorage.getItem("isLoggedin") &&
      localStorage.getItem("isLoggedin") != "true"
    ) {
      this.router.navigate(["/"]);
    }
    return true;
  }
}
