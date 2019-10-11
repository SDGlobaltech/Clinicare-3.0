import { Injectable } from "@angular/core";
import { admissionDetails, transferHistory } from "./interfaces/admission";

@Injectable({
  providedIn: "root"
})
export class AdmissionTransformerService {
  /**
   *
   * @param admissionDetails
   */
  makeAdmissionObject(admissionDetails): admissionDetails {
    return {
      resourceType: this.getResourceType(admissionDetails),
      id: this.getId(admissionDetails),
      createdDate: this.getCreatedDate(admissionDetails),
      doctorDetails: this.getDoctorDetails(admissionDetails),
      admissionDate: this.getAdmissionDate(admissionDetails),
      admissionNumber: this.getAdmissionNumber(admissionDetails),
      departmentCode: this.getDepartmentCode(admissionDetails),
      departmentName: this.getDepartmentName(admissionDetails),
      sourceTypeName: this.getSourceTypeName(admissionDetails),
      admissionToken: this.getAdmissionToken(admissionDetails),
      businessStatus: this.getBusinessStatus(admissionDetails),
      bedComponent: this.getBedComponent(admissionDetails),
      wardComponent: this.getWardComponent(admissionDetails),
      roomComponent: this.getRoomComponent(admissionDetails),
      currentBedId: this.getCurrentBedId(admissionDetails),
      isClinicalDischarge: this.getIsClinicalDischarge(admissionDetails)
    };
  }

  makebedHistoryDetails(bedHistoryComponent): transferHistory {
    let i = 0;
    let bedFromDetails = [];
    let fromWardDetails = [];
    let bedToDetails = [];
    let toWarddetails = [];
    for (i = 0; i < bedHistoryComponent.length; i++) {
      if (i == 0 || i % 3 == 0) {
        if (i == 0 || i % 2 == 0) {
          bedFromDetails.push(bedHistoryComponent[i]);
          fromWardDetails.push(bedHistoryComponent[i + 1]);
        } else {
          bedToDetails.push(bedHistoryComponent[i]);
          toWarddetails.push(bedHistoryComponent[i + 1]);
        }
      }
    }
    return {
      fromBed: this.getFromBed(bedFromDetails),
      fromBedDetails: this.getFromBedDetails(fromWardDetails),
      fromBedCatg: this.getFromBedCatg(bedFromDetails),
      toBed: this.getToBed(bedToDetails),
      toBedDetails: this.getToBedDetails(toWarddetails),
      toBedCatg: this.getToBedCatg(bedToDetails),
      reasonForTransfer: this.getReasonForTransfer(bedFromDetails),
      requestBy: this.getRequestBy(bedFromDetails),
      authorizedBy: this.getAuthorizedBy(bedFromDetails),
      transferBy: this.getTransferBy(bedFromDetails),
      acceptBy: this.AcceptBy(bedFromDetails)
    };
  }
  getFromBed(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.type[0].coding[0].display);
    });
    return bedHistory;
  }
  getToBed(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.type[0].coding[0].display);
    });
    return bedHistory;
  }
  getFromBedDetails(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.type[0].coding[0].display);
    });
    return bedHistory;
  }
  getFromBedCatg(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.categoryDetails.display);
    });
    return bedHistory;
  }
  getToBedDetails(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.type[0].coding[0].display);
    });
    return bedHistory;
  }
  getToBedCatg(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.categoryDetails.display);
    });
    return bedHistory;
  }
  getReasonForTransfer(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.reasonForTransfer);
    });
    return bedHistory;
  }
  getRequestBy(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.requestBy);
    });
    return bedHistory;
  }
  getAuthorizedBy(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.authorizedBy);
    });
    return bedHistory;
  }
  getTransferBy(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.transferBy);
    });
    return bedHistory;
  }
  AcceptBy(bedHistoryComponent: any): Array<string> {
    let bedHistory = [];
    bedHistoryComponent.forEach(element => {
      bedHistory.push(element.acceptBy);
    });
    return bedHistory;
  }

  /**
   *
   * @param admissionDetails
   */
  getRoomComponent(admissionDetails: any): any {
    let roomDetails = {
      code: "",
      display: "",
      text: ""
    };

    if (admissionDetails.bedComponent) {
      roomDetails.code =
        admissionDetails.bedComponent[2].type[0].coding[0].code;
      roomDetails.display =
        admissionDetails.bedComponent[2].type[0].coding[0].display;
      roomDetails.text = admissionDetails.bedComponent[2].type[0].text;
    }

    return roomDetails;
  }

  /**
   *
   * @param admissionDetails
   */
  getWardComponent(admissionDetails: any): any {
    let warddetails = {
      code: "",
      display: "",
      text: ""
    };

    if (admissionDetails.bedComponent) {
      warddetails.code =
        admissionDetails.bedComponent[1].type[0].coding[0].code;
      warddetails.display =
        admissionDetails.bedComponent[1].type[0].coding[0].display;
      warddetails.text = admissionDetails.bedComponent[1].type[0].text;
    }
    return warddetails;
  }

  /**
   *
   * @param admissionDetails
   */
  private getAdmissionDate(admissionDetails: any): Date {
    return admissionDetails.admissionDate;
  }

  /**
   *
   * @param admissionDetails
   */
  private getAdmissionNumber(admissionDetails: any): string {
    return admissionDetails.admissionNumber;
  }

  /**
   *
   * @param admissionDetails
   */
  private getDepartmentCode(admissionDetails: any): string {
    return admissionDetails.departmentCode;
  }

  /**
   *
   * @param admissionDetails
   */
  getDepartmentName(admissionDetails: any): string {
    return admissionDetails.departmentName;
  }

  /**
   *
   * @param admissionDetails
   */
  getSourceTypeName(admissionDetails: any): string {
    return admissionDetails.sourceTypeName;
  }

  /**
   *
   * @param admissionDetails
   */
  getAdmissionToken(admissionDetails: any): string {
    return admissionDetails.admissionToken;
  }

  /**
   *
   * @param admissionDetails
   */
  getBusinessStatus(admissionDetails: any): string {
    return admissionDetails.businessStatus;
  }

  /**
   *
   * @param admissionDetails
   */
  getBedComponent(admissionDetails: any): any {
    let bedDetails = {
      code: "",
      display: "",
      text: "",
      category: {
        code: "",
        display: ""
      }
    };
    if (admissionDetails.bedComponent) {
      bedDetails.code = admissionDetails.bedComponent[0].type[0].coding[0].code;
      bedDetails.display =
        admissionDetails.bedComponent[0].type[0].coding[0].display;
      bedDetails.text = admissionDetails.bedComponent[0].type[0].text;
      bedDetails.category.code =
        admissionDetails.bedComponent[0].categoryDetails.code;
      bedDetails.category.display =
        admissionDetails.bedComponent[0].categoryDetails.display;
    }

    return bedDetails;
  }

  /**
   *
   * @param admissionDetails
   */
  getCurrentBedId(admissionDetails: any): string {
    return admissionDetails.currentBedId;
  }

  /**
   *
   * @param admissionDetails
   */
  getIsClinicalDischarge(admissionDetails: any): boolean {
    return admissionDetails.isClinicalDischarge;
  }

  /**
   *
   * @param admissionDetails
   */
  getDoctorDetails(admissionDetails: any): any {
    let doctorDetails = {
      resourceType: "",
      name: ""
    };

    if (admissionDetails.doctorDetails) {
      doctorDetails.resourceType = admissionDetails.doctorDetails.resourceType;
      doctorDetails.name = admissionDetails.doctorDetails.name[0].text;
    }
    return doctorDetails;
  }

  /**
   *
   * @param admissionDetails
   */
  getCreatedDate(admissionDetails: any): Date {
    return admissionDetails.createdDate;
  }

  /**
   *
   * @param admissionDetails
   */
  getId(admissionDetails: any): string {
    return admissionDetails.id;
  }

  /**
   *
   * @param admissionDetails
   */
  getResourceType(admissionDetails: any): string {
    return admissionDetails.resourceType;
  }
}
