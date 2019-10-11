import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GmailformatPipe } from "./gmailformat.pipe";
import { NameformatterPipe } from "./nameformatter.pipe";
import { CamelCasePipe } from "./camel-case.pipe";
@NgModule({
  declarations: [GmailformatPipe, CamelCasePipe, NameformatterPipe],
  imports: [CommonModule],
  exports: [GmailformatPipe, CamelCasePipe, NameformatterPipe]
})
export class ApplicationPipeModule {}
