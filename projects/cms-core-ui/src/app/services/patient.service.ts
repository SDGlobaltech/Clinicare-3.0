import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RegisterModel } from "./RegistationModel";

@Injectable({
  providedIn: "root"
})
export class PatientService {
  private messageSource = new BehaviorSubject({});

  constructor() {}

  getPatientModel(patient: any) {
    try {
      let dateOfBirth: Date;
      if (patient.birthDate) {
        dateOfBirth = new Date(patient.birthDate);
      }
      let expiryDate = new Date();
      if (
        patient.identifier &&
        patient.identifier[1] &&
        patient.identifier.period &&
        patient.identifier.end
      ) {
        expiryDate = new Date(patient.identifier[1].period.end);
      } else {
        expiryDate = new Date();
      }
      let identification = "";
      if (
        patient.identifier[2] &&
        patient.identifier[2].type &&
        patient.identifier[2].type.text
      ) {
        identification = patient.identifier[2].type.text;
      } 
      if (
        patient.identifier[1] &&
        patient.identifier[1].type &&
        patient.identifier[1].type.text
      ) {
        identification = patient.identifier[1].type.text;
      }else {
        identification = "NA";
      }

      let primaryValue = "",
        primaryId = "",
        primaryCode = "";
      if (patient.identifier[1] && patient.identifier[1].value) {
        primaryValue = patient.identifier[1].value;
      }
      if (patient.identifier[1] && patient.identifier[1].type) {
        primaryId = patient.identifier[1].type.coding[0].code;
        primaryCode = patient.identifier[1].type.text;
      }

      let emailId = "",
        homecontact = "",
        tempcontact = "";
      if (patient.telecom) {
        let telecom = patient.telecom.find(i => i.system == "email");
        if (telecom) {
          emailId = telecom.value;
        }
        telecom = patient.telecom.find(
          i => i.system == "phone" && i.use == "home"
        );
        if (telecom) {
          homecontact = telecom.value;
        }
        telecom = patient.telecom.find(
          i => i.system == "phone" && i.use == "temp"
        );
        if (telecom) {
          tempcontact = telecom.value;
        }
      }

   
      const patientModel: RegisterModel = {
        MongoId: patient.id,
        primaryIDdesc: primaryValue,
        primaryId: primaryId,
        primaryCode: primaryCode,
        firstName: patient.name[0].text,
        middleName: "NA",
        lastName: "NA",
        otherName: patient.name[1] ? patient.name[1].text : "",
        dob: dateOfBirth,
        phoneNumber: patient.telecom[0].value,
        photo:
          patient.photo && patient.photo[0] && patient.photo[0].url
            ? patient.photo[0].url
            : "",
        MRN: patient.mrnno,
        emailId: emailId,
        docID: patient.identifier[2] ? patient.identifier[2].value : "",
        prefix:
          patient.name[0] && patient.name[0].prefix && patient.name[0].prefix[0]
            ? patient.name[0].prefix[0]
            : "",
        gender: patient.gender,
        race: patient.race,
        nation: patient.nationality,
        religion : patient.religion,
        pcat: patient.patientCategory,
        identification: identification,
        martial:
          patient.maritalStatus && patient.maritalStatus.coding[0]
            ? patient.maritalStatus.coding[0].display
            : "",
        phonenumberL: tempcontact,
        expirDate: expiryDate,
        occupation: patient.occupation,
        address:
          patient.address &&
          patient.address[0] &&
          patient.address[0].line &&
          patient.address[0].line[0]
            ? patient.address[0].line[0]
            : "",
        country:
          patient.address && patient.address[0] && patient.address[0].country
            ? patient.address[0].country
            : "",
        state:
          patient.address && patient.address[0] && patient.address[0].state
            ? patient.address[0].state
            : "",
        district:
          patient.address && patient.address[0] && patient.address[0].city
            ? patient.address[0].city
            : "",
        pincode:
          patient.address && patient.address[0] && patient.address[0].postalCode
            ? patient.address[0].postalCode
            : "",
        addressP:
          patient.address &&
          patient.address[1] &&
          patient.address[1].line &&
          patient.address[1].line[0]
            ? patient.address[1].line[0]
            : "",
        countryP:
          patient.address && patient.address[1] && patient.address[1].country
            ? patient.address[1].country
            : "",
        stateP:
          patient.address && patient.address[1] && patient.address[1].state
            ? patient.address[1].state
            : "",
        cityP:
          patient.address && patient.address[1] && patient.address[1].city
            ? patient.address[1].city
            : "",
        pinccodeP:
          patient.address && patient.address[1] && patient.address[1].postalCode
            ? patient.address[1].postalCode
            : "",
        age: patient.age,
        phonenumberP: homecontact,
        admissionInfo : patient.admissionInfo?patient.admissionInfo:{}
      };
      //this.messageSource.next(patientModel);
      return patientModel;
    } catch (ex) {}
  }
}
