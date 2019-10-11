import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Constants } from './constants';

@Pipe({
  name: 'gmailformat'
})
export class GmailformatPipe extends DatePipe implements PipeTransform {

   datePipe = new DatePipe('en-US');
  // createdDate =new Date(2018,8,16);
  todaydate = new Date();

  todaydate1 =  this.datePipe.transform(this.todaydate, 'yyyy,M,dd');
  currentYear = new Date();
  currentYear1 =  this.datePipe.transform(this.currentYear, 'yyyy,1,01');




  transform(
    value: any
    ): any {

      const data = value;

      const datePipe = new DatePipe('en-US');
      let data1: any;
      data1 = datePipe.transform(data, 'yyyy,M,dd');

      //  var datePipe = new DatePipe("en-US");
      //  value = datePipe.transform(value, 'dd/MM/yyyy');
      // alert(this.todaydate1);
      // alert(this.currentYear1);


  if ( data1 > this.currentYear1 && data1 < this.todaydate1) {
    console.log(super.transform(value, Constants.MONTH_DAY));
   return super.transform(value, Constants.MONTH_DAY);

  } else if ( data1 < this.currentYear1 && this.todaydate1) {
    console.log(super.transform(value, Constants.DAY_MONTH_YEAR));
    return super.transform(value, Constants.DAY_MONTH_YEAR);
  } else { ( data1 === this.todaydate1 ); }
  {
    console.log(super.transform(value, Constants.TIME));
    return super.transform(value, Constants.TIME);
  }

  }



}
