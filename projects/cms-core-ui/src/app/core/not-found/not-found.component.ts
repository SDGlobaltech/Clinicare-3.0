import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"]
})
export class NotFoundComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) {
    this.errorMessage = this.route.snapshot.paramMap.get("errorMessage");
  }

  return() {
    window.history.back();
  }

  ngOnInit() {}
}
