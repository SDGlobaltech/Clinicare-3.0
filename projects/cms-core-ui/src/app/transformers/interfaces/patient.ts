/**
 *
 */
export interface Patient {
  id:string,
  unitId:string,
  unitCode:string,
  orgId:string,
  orgCode:string,
  createdDate:string,
  createdBy:string,
  meta:PatientMeta,
  identifier:Array<PatientIdentifier>,
  active: boolean,
  name: Array<PatientName>,
  telecom: Array<PatientTelecom>,
  gender:string,
  birthDate:string,
  address:Array<PatientAddress>,
  maritalStatus: PatientMaritalStatus,
  photo: Array<PatientPhoto>,
  contact: Array<PatientContact>,
  race: string,
  patientCategory: string,
  age: string,
  nationality: string,
  mrnno: string,
  registrationDate: number,
  patientAutoSequenceNo: number,
  faculty: PatientFaculty,
  unitName: string,
  admissionInfo:PatientAdmissionInfo
}
export interface PatientAdmissionInfo{
  admissionInfo? : any
}

/**
 *
 */
export interface PatientMeta {
  profile :[]
}

/**
 *
 */
export interface PatientIdentifier {
  use: string,
  type: PatientIdentifierType,
  value: string
}

/**
 *
 */
export interface PatientIdentifierType {
  coding: Array<PatientIdentifierCoding>,
  text: string
}

/**
 *
 */
export interface PatientIdentifierCoding {
  system: string,
  code: string
}
/**
 *
 */
export interface PatientName{
  use: string,
  text: string,
  prefix: Array<string>
}

/**
 *
 */
export interface PatientTelecom {
  system: string,
  value: string,
  use: string,
}

/**
 *
 */
export interface PatientAddress {
  use: string,
  line: Array<string>,
  city: string,
  state: string,
  postalCode: string,
  country: string,
}

/**
 *
 */
export interface PatientMaritalStatus {
  coding: Array<PatientMaritalStatusCode>
}

/**
 *
 */
export interface PatientMaritalStatusCode {
  system: string,
  code: string,
  display: string,
}

/**
 *
 */
export interface PatientPhoto {
  contentType: string,
  url:string
}

/**
 *
 */
export interface PatientContact {
      relationship: Array<PatientContactRelationShip>,
      organization: PatientContactOrganization
}

/**
 *
 */
export interface PatientContactRelationShip {
  coding: Array<PatientContactRelationShipCode>
}

/**
 *
 */
export interface PatientContactRelationShipCode {
  system: string,
  code: string,
}

/**
 *
 */
export interface PatientContactOrganization {
  reference: string,
  display: string,
}

/**
 *
 */
export interface PatientFaculty {
  coding: Array<PatientFacultyCoding>,
  text: string
}

/**
 *
 */
export interface PatientFacultyCoding {
  display: string
}
