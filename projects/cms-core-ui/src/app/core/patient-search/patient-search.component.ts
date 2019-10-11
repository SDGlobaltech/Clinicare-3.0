import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  DoCheck,
  SimpleChanges
} from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
import { AppBaseService } from "../../services/http.service";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { PatientService } from "./../../services/patient.service";

@Component({
  selector: "app-patient-search",
  templateUrl: "./patient-search.component.html",
  styleUrls: ["./patient-search.component.scss"]
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientSearchComponent implements OnChanges {
  firstChange: boolean;
  @Input() search: any;
  @Input() list: any;
  @Input() refreshTime: string;
  @Output() onActionClick: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);
  advancedSearch: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = [
    "photo",
    "MRN",
    "firstName",
    "gender",
    "phoneNumber",
    "dob",
    "identification",
    "docID"
  ];
  result: any[];
  searchCount: number = null;
  name: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  mrnNumber: string;
  patientId: string;
  showTable: boolean = true;
  constructor(
    private baseservice: AppBaseService,
    private loadingBar: LoadingBarService,
    public snackBar: MatSnackBar,
    private patientService: PatientService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshTime) {
      this.firstChange = changes.refreshTime.firstChange;
    }
    if (!this.firstChange) {
      if (!this.list && this.search) this.getPatientList();
      else this.displayList(this.list);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
    if (this.advancedSearch && this.advancedSearch.unsubscribe())
      this.advancedSearch.unsubscribe();
  }

  getPatientList() {
    const data1 = "'" + this.search.startDate + "'";
    const endData = "'" + this.search.endDate + "'";
    const endDate = new Date(endData);
    const date = new Date(data1);
    const st = date.getTime() / 1000;
    const et =
      new Date(new Date(endDate).setHours(23, 59, 0, 0)).getTime() / 1000;
    const data = {
      mrnno: this.search.MRN,
      //unit: this.search.unit?this.search.unit["code"]:"",
      unitId: this.search.unit,
      name: this.search.patientName,
      encounterNo: this.search.encounterNo,
      visittype: this.search.visittype,
      billno: this.search.billno,
      birthdate: this.returnFormattedDate(this.search.dob),
      gender: this.search.gender,
      identity: {
        type: this.search.identificationType,
        value: this.search.identificationID
      },
      mobile: this.search.mobileNo,
      address: {
        use: "temp",
        country: this.search.country,
        state: this.search.state,
        city: this.search.city
      },
      pinCode: this.search.pincode,
      registrationDate: {
        start: st,
        end: et
      }
    };

    this.baseservice.setResourceURL("/opd-service/");
    this.advancedSearch = this.baseservice
      .postResource("extendedPatient/advanceSearch", data)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.searchCount = res.length;
        this.loadingBar.complete();
        this.displayList(res);
      });
  }

  displayList(patients) {
    this.result = [];
    if (patients) {
      patients.forEach(patient => {
        let data = this.patientService.getPatientModel(patient);
        if (data) this.result.push(data);
      });
    }
    //To check whether the table is empty
    if (this.result.length != 0) {
      this.dataSource = new MatTableDataSource<any>(this.result);
      this.showTable = true;
    } else {
      this.snackBar.open("No Patients to display for Search criteria", "", {
        duration: 1000
      });
      this.showTable = false;
    }
  }

  patientOnSelect(patient) {
    this.name = patient.firstName;
    this.dateOfBirth = patient.dob;
    this.age = patient.age;
    this.gender = patient.gender;
    this.mrnNumber = patient.MRN;
    this.patientId = patient.MongoId;
    this.showTable = false;
    this.onActionClick.emit(patient);
  }

  returnFormattedDate(dateObj) {
    let codDate = "";
    if (dateObj) {
      codDate =
        new Date(dateObj).getFullYear() +
        "-" +
        ("0" + (new Date(dateObj).getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + new Date(dateObj).getDate()).slice(-2) +
        "T00:00:00.000Z";
    }
    return codDate;
  }
}

export class RegisterModel {
  placeholder?: any;
  MongoId?: any;
  MRN?: any;
  NRIC?: string;
  primaryId?: String;
  primaryIDdesc?: any;
  passport?: any;
  expirDate?: any;
  firstName: String;
  middleName?: String;
  lastName?: String;
  otherName: String;
  dob?: any;
  phoneNumber?: any;
  emailId?: String;
  docID?: any;
  prefix?: any;
  gender?: any;
  race?: any;
  nation?: any;
  pcat?: any;
  identification?: any;
  martial?: any;
  occupation?: any;
  photo?: any;
  relegion?: any;
  address?: any;
  country?: String;
  state?: String;
  district?: String;
  pincode?: String;
  phonenumberL?: any;
  addressP?: any;
  countryP?: String;
  stateP?: String;
  cityP?: String;
  test?: any;
  pinccodeP?: String;
  phonenumberP?: String;
  age?: any;
  regType?: any;
  regTypeId?: any;
}
