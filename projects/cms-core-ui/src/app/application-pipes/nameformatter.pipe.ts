import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nameformatter"
})
export class NameformatterPipe implements PipeTransform {
  str: any;
  transform(value: any, args?: any): any {
    const data = value;

    //  this.str="Mr abhi 32/M";

    //   for(let i=0;i<this.str.length;i++){

    //   }
    if (data == "Blood Test") {
      return data;
    } else {
      return data;
    }
  }
}
