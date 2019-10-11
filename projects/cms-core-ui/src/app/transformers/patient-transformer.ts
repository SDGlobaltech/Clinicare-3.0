import {Injectable} from "@angular/core";
import {
  Patient as PatientInterface,
  PatientMeta,
  PatientIdentifier,
  PatientName,
  PatientTelecom,
  PatientAddress,
  PatientMaritalStatus,
  PatientMaritalStatusCode,
  PatientPhoto,
  PatientContact,
  PatientContactRelationShip,
  PatientContactOrganization,
  PatientContactRelationShipCode,
  PatientFaculty,
  PatientFacultyCoding,
  PatientIdentifierType,
  PatientIdentifierCoding,
  PatientAdmissionInfo
} from './interfaces/patient';

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
export class PatientTransformer {


  /**
   *
   * @param patientResponseData
   *
   * @return PatientInterface
   */
  makePatientObject(patientResponseData) : PatientInterface {

      return  {
        id:this.getId(patientResponseData),
        unitId:this.getUnitId(patientResponseData),
        unitCode:this.getUnitCode(patientResponseData),
        orgId:this.getOrgId(patientResponseData),
        orgCode:this.getOrgCode(patientResponseData),
        createdDate:this.getCreatedDate(patientResponseData),
        createdBy:this.getCreatedBy(patientResponseData),
        meta: this.getMeta(patientResponseData),
        identifier:this.getIdentifier(patientResponseData),
        active: this.getActive(patientResponseData),
        name: this.getName(patientResponseData),
        telecom: this.getTelecom(patientResponseData),
        gender:this.getGender(patientResponseData),
        birthDate:this.getBirthDate(patientResponseData),
        address: this.getAddress(patientResponseData),
        maritalStatus: this.getMaritalStatus(patientResponseData),
        photo: this.getPhoto(patientResponseData),
        contact:this.getContact(patientResponseData),
        race:this.getRace(patientResponseData),
        patientCategory:this.getPatientCategory(patientResponseData),
        age:this.getAge(patientResponseData),
        nationality:this.getNationality(patientResponseData),
        mrnno:this.getMRNNo(patientResponseData),
        registrationDate:this.getRegistrationDate(patientResponseData),
        patientAutoSequenceNo: this.getPatientAutoSequenceNo(patientResponseData),
        faculty:this.getFaculty(patientResponseData),
        unitName:this.getUnitName(patientResponseData),
        admissionInfo: this.getAdmissionInfo(patientResponseData)
      }
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getId(patientResponseData: any) : string {
    return patientResponseData.id;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getGender(patientResponseData: any) : string {
    return this.getDefaultValue(patientResponseData.gender);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getBirthDate(patientResponseData) :string {
    return this.getDefaultValue(patientResponseData.birthDate);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getUnitCode(patientResponseData: any):string {
    return this.getDefaultValue(patientResponseData.unitCode);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getUnitId(patientResponseData: any):string {
    return this.getDefaultValue(patientResponseData.unitId);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getOrgId(patientResponseData: any):string {
    return this.getDefaultValue(patientResponseData.orgId);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getOrgCode(patientResponseData: any):string {
    return this.getDefaultValue(patientResponseData.orgCode);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getCreatedDate(patientResponseData: any):string {
    return this.getDefaultValue(patientResponseData.createdDate);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getCreatedBy(patientResponseData: any):string {
    return this.getDefaultValue(patientResponseData.createdBy);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return PatientMeta
   */
  private getMeta(patientResponseData: any):PatientMeta {
    let meteValue:PatientMeta = {
      profile :[]
    };
    if(
      patientResponseData.meta !== undefined &&
      patientResponseData.meta.profile !== undefined
      && typeof patientResponseData.meta.profile.length!== undefined
    ) {
      meteValue.profile = patientResponseData.meta.profile;
    }

    return meteValue;
  }
/**
   *
   * @param patientResponseData
   *
   * @return Array<PatientIdentifier>
   */
  private getIdentifier(patientResponseData: any):Array<PatientIdentifier> {
    let identifier = patientResponseData.identifier;
    let identifierReturn: Array<PatientIdentifier> = [];
    for(let i = 0; i < 3;  i++) {
      if(identifier[i] !== undefined) {
        let getType = this.getIdentifierType(identifier[i].type);
        identifierReturn.push({
          use: this.getDefaultValue(identifier[i].use),
          type: getType,
          value: this.getDefaultValue(identifier[i].value)
        });
      } else {
        identifierReturn.push({
          use: "",
          type: {
            coding: [
              {
                system: "",
                code:""
              }
            ],
            text: "",
          },
          value: "",
        });
      }
    }
    return identifierReturn;
  }
  /**
   *
   * @param patientResponseData
   *
   * @return PatientAdmissionInfo
   */
  private getAdmissionInfo(patientResponseData: any):PatientAdmissionInfo {
    let admissionInfo = patientResponseData.admissionInfo;
    let admissionInfoReturn: PatientAdmissionInfo = {};

      if(admissionInfo !== undefined) {
        admissionInfoReturn = admissionInfo;
      } 

    return admissionInfoReturn;
  }

  /**
   *
   * @param identifierType
   *
   * @return PatientIdentifierType
   */
  private getIdentifierType(identifierType): PatientIdentifierType {
    let identifierTypeReturn :PatientIdentifierType;

    if (identifierType === undefined) {
      identifierTypeReturn = {
        coding: [
          {
            system: '',
            code:''
          }
        ],
        text: ''
      };
    } else {
      identifierTypeReturn = {
        coding:this.getIdentifierTypeCoding(identifierType.coding),
        text :this.getDefaultValue(identifierType.text)
      };
    }

    return identifierTypeReturn;
  }

  /**
   *
   * @param coding
   *
   * @return Array<PatientIdentifierCoding>
   */
  private getIdentifierTypeCoding(coding):Array<PatientIdentifierCoding> {
    let getIdentifierTypeCodingResponse:Array<PatientIdentifierCoding> = [];

      if(coding == undefined) {
        getIdentifierTypeCodingResponse.push({
          system: '',
          code : ''
        });
      } else {
        coding.forEach(item => {
          getIdentifierTypeCodingResponse.push({
            system: this.getDefaultValue(item.system),
            code: this.getDefaultValue(item.code)
          });
        });
      }


      return getIdentifierTypeCodingResponse;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return boolean
   */
  private getActive(patientResponseData: any):boolean {
    return patientResponseData.active !== undefined && typeof patientResponseData.active === "boolean" ? patientResponseData.active : true;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return Array<PatientName>
   */
  private getName(patientResponseData: any):Array<PatientName> {
    let name = patientResponseData.name;
    let nameReturn:Array<PatientName> = [];
    if (name === undefined) {
      nameReturn.push({
        use: '',
        text: '',
        prefix: ['']
      });
    } else {
      name.forEach(item => {
        nameReturn.push({
          use: this.getDefaultValue(item.use),
          text: this.getDefaultValue(item.text),
          prefix: item.prefix == undefined ? [''] : this.getPatientPrefix(item.prefix)
        });
      });
    }


    return nameReturn;
  }

  /**
   *
   * @param prefix
   *
   * @return Array<string>
   */
  private getPatientPrefix(prefix:Array<string>) {
    return prefix
  }

  /**
   *
   * @param patientResponseData
   * @return Array<PatientName>
   */
  private getTelecom(patientResponseData: any):Array<PatientTelecom> {
    let telecom = patientResponseData.telecom;
    let telecomReturn:Array<PatientTelecom> = [];
    for (let i = 0; i < 4; i++) {
      let item = telecom[i];
      if (telecom[i] === undefined) {
        telecomReturn.push({
          system: "",
          value: "",
          use: ""
        });
      } else {
        telecomReturn.push({
          system: this.getDefaultValue(item.system),
          value: this.getDefaultValue(item.value),
          use: this.getDefaultValue(item.use)
        });
      }
    }

    return telecomReturn;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return Array<PatientAddress>
   */
  private getAddress(patientResponseData): Array<PatientAddress>{
    let addressResponse:Array<PatientAddress> = [];
    let address = patientResponseData.address;

      for(let i=0; i <2; i++) {
        if(address){
        if ( address[i] === undefined) {
          addressResponse.push({
            use: "",
            line: [''],
            city: "",
            state: "",
            postalCode: "",
            country: ""
          });
        } else {
          addressResponse.push({
              use: this.getDefaultValue(address[i].use),
              line: address[i].line === undefined ? [''] : this.getAddressLine(address[i].line),
              city: this.getDefaultValue(address[i].city),
              state: this.getDefaultValue(address[i].state),
              postalCode: this.getDefaultValue(address[i].postalCode),
              country: this.getDefaultValue(address[i].country),
            });
          }
        }
      }

    return addressResponse;
  }

  /**
   *
   * @param line
   *
   * @return Array<string>
   */
  private getAddressLine(line:Array<string>) :Array<string> {
    return  line;
  }

  /**
   *
   * @param patientResponseData
   */
  private getMaritalStatus(patientResponseData) :PatientMaritalStatus {
    let martialStatusResponse:Array<PatientMaritalStatusCode>;
if(patientResponseData.maritalStatus){
    martialStatusResponse = this.getPatientMaritalStatusCode(patientResponseData.maritalStatus.coding);

    return {coding : martialStatusResponse};
}
  }

  /**
   *
   * @param maritalStatusCode
   *
   * @return Array<PatientMaritalStatusCode>
   */
  private getPatientMaritalStatusCode(maritalStatusCode) :Array<PatientMaritalStatusCode> {
      let martialStatusCodeResponse:Array<PatientMaritalStatusCode> = [];

      for (let i=0; i<2; i++) {
        if(maritalStatusCode){
          if (maritalStatusCode[i] === undefined) {
            martialStatusCodeResponse.push({
              system: '',
              code: '',
              display: '',
            });
          } else {
            martialStatusCodeResponse.push({
              system: maritalStatusCode[i].system,
              code: maritalStatusCode[i].code,
              display: maritalStatusCode[i].display,
            });
          }
        }
      }

      return martialStatusCodeResponse;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return Array<PatientPhoto>
   */
  private getPhoto(patientResponseData) :Array<PatientPhoto> {
    let photoResponse:Array<PatientPhoto> = [];
    let photo = patientResponseData.photo;

    if (photo === undefined) {
      photoResponse.push({
        contentType : '',
        url:''
      });
    } else {
      photo.forEach(photoItem => {
        photoResponse.push({
          contentType : this.getDefaultValue(photoItem.contentType),
          url : this.getDefaultValue(photoItem.url),
        });
      });
    }

    return  photoResponse;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return Array<PatientContact>
   */
  private getContact(patientResponseData): Array<PatientContact> {
    if(patientResponseData.contact){
    let contact = patientResponseData.contact;
    let contactResponse:Array<PatientContact> = [];

    contact.forEach(contactItem => {
      contactResponse.push({
        relationship:this.getPatientContactRelationShip(contactItem.relationship),
        organization:this.getPatientContactOrganization(contactItem.organization)
      });
    });

    return contactResponse;
  }
  }
  /**
   *
   * @param relationShip
   *
   * @return Array<PatientContactRelationShip
   */
  private getPatientContactRelationShip(relationShip):Array<PatientContactRelationShip> {
    let relationShipResponse:Array<PatientContactRelationShip> = [];
    if (relationShip === undefined) {
      relationShipResponse = [{
        coding: [
          {
            system: "",
            code: ""
          }
        ]
      }];
    } else {
      relationShip.forEach(relationShipItem => {
          let relationShipItemResponse: Array<PatientContactRelationShipCode> = [];
          if (relationShipItem.coding === undefined) {
            relationShipItemResponse = [{
              system: "",
              code: ""
            }];
          } else {
            relationShipItemResponse = this.getPatientContactRelationShipCode(relationShipItem.coding);
          }

        relationShipResponse.push({coding : relationShipItemResponse});
      });
    }

    return  relationShipResponse;
  }

  /**
   *
   * @param coding
   *
   * @return Array<PatientContactRelationShipCode>
   */
  private getPatientContactRelationShipCode(coding):Array<PatientContactRelationShipCode> {
    let codingResponse:Array<PatientContactRelationShipCode> = [];
    coding.forEach(codingItem => {
      codingResponse.push({
        system: this.getDefaultValue(codingItem.system),
        code: this.getDefaultValue(codingItem.code),
      });
    });

    return  codingResponse;
  }
  /**
   *
   * @param organization
   *
   * @return PatientContactOrganization
   */
  private getPatientContactOrganization(organization):PatientContactOrganization {
    let organizationResponse:PatientContactOrganization;

    if (organization === undefined) {
      organizationResponse = {
        reference: "",
        display: ""
      };
    } else {
      organizationResponse = {
        reference: this.getDefaultValue(organization.reference),
        display: this.getDefaultValue(organization.display),
      }
    }

    return  organizationResponse;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getRace(patientResponseData):string {
    return  this.getDefaultValue(patientResponseData.race);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getPatientCategory(patientResponseData): string {
    return  this.getDefaultValue(patientResponseData.patientCategory);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getAge(patientResponseData):string {
    return  this.getDefaultValue(patientResponseData.age);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getNationality(patientResponseData):string {
    return  this.getDefaultValue(patientResponseData.nationality);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getMRNNo(patientResponseData):string {
    return  this.getDefaultValue(patientResponseData.mrnno);
  }

  /**
   *
   * @param patientResponseData
   *
   * @return number
   */
  private getRegistrationDate(patientResponseData):number {
    return  patientResponseData.registrationDate === undefined ? 0 : patientResponseData.registrationDate;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return number
   */
  private getPatientAutoSequenceNo(patientResponseData):number {
    return  patientResponseData.patientAutoSequenceNo === undefined ? 0 : patientResponseData.patientAutoSequenceNo;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return PatientFaculty
   */
  private getFaculty(patientResponseData):PatientFaculty {
    let faculty = patientResponseData.faculty;
    let facultyResponse:PatientFaculty;

    if (faculty === undefined) {
      facultyResponse = {
        coding:this.getFacultyCoding(faculty),
        text: ''
      };
    } else {
      facultyResponse = {
        coding:this.getFacultyCoding(faculty.coding),
        text: this.getDefaultValue(faculty.text)
      };
    }

    return  facultyResponse
  }

  /**
   *
   * @param facultyCoding
   *
   * @return Array<PatientFacultyCoding
   */
  private getFacultyCoding(facultyCoding):Array<PatientFacultyCoding> {
    let codingResponse:Array<PatientFacultyCoding> = [];

    if(facultyCoding === undefined) {
      codingResponse.push({
          display:''
      });
    } else {
      codingResponse.push({
        display:this.getDefaultValue(facultyCoding.display)
      });
    }

    return  codingResponse;
  }

  /**
   *
   * @param patientResponseData
   *
   * @return string
   */
  private getUnitName(patientResponseData):string {
    return this.getDefaultValue(patientResponseData.unitName);
  }
  /**
   *
   * @param value
   * @param defaultValue
   *
   *  @return string
   */
  private getDefaultValue(value :string, defaultValue:string = ''): string {
    return value === undefined ? defaultValue : value;
  }
}
