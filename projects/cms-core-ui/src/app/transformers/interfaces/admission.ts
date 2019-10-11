/**
 * Interface for Admission details
 */
export interface admissionDetails{
    resourceType: string,
    id: string,
    createdDate: Date,
    doctorDetails: any,
    admissionDate: Date,
    admissionNumber: string,
    departmentCode: string,
    departmentName: string,
    sourceTypeName: string,
    admissionToken: string,
    businessStatus: string,
    bedComponent: any,
    wardComponent: any;
    roomComponent: any;
    currentBedId: string,
    isClinicalDischarge: boolean
}

export interface transferHistory{
    fromBed: Array<string>,
    toBed: Array<string>,
    fromBedDetails: Array<string>,
    fromBedCatg: Array<string>,
    toBedDetails: Array<string>,
    toBedCatg: Array<string>,
    reasonForTransfer: Array<string>,
    requestBy: Array<string>,
    authorizedBy: Array<string>,
    transferBy: Array<string>,
    acceptBy: Array<string>
}