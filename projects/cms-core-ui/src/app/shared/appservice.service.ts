
import {throwError as observableThrowError,  Subject ,  throwError as _throw ,  Observable ,  BehaviorSubject } from 'rxjs';

import {catchError,  map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class AppserviceService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private credentials$ = new BehaviorSubject<any>({
    username: 'initial username',
    password: 'initial password'
  });

  urlData: any;
  orgId: any;
  orgUnitId: any;
  deptId: any;
  public getCredentials(): Observable<any> {
    return this.credentials$;
  }

  public setCredentials(credentials: any) {
    this.credentials$.next(credentials);
  }

  constructor(private http: Http, private httpClient: HttpClient) {
    // this.urlData="http://54.70.55.108:8080/";

    this.urlData = 'http://18.236.110.214:9001/';
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  loginCheck(profile) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post('http://54.218.99.219:3300/ehr/login', body, options)
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }

  getAllPateint(offset, range) {
    console.log('offset' + offset);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.urlData + 'fhir/Patient?_has:ProcedureRequest:patient:status=l')
      .pipe(map((res: Response) => res.json()));

    // return this.http.get('assets/data/workorder.json').pipe(map((res: Response) => res.json()));
  }

  getTotalPhlebotomyWorkRecordTotal() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get('').pipe(map((res: Response) => res.json()));
  }

  getPhlebotomyDetails(id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.urlData + 'fhir/ProcedureRequest?subject=' + id)
      .pipe(map((res: Response) => res.json()));

    // return this.http.get('assets/data/details.json').pipe(map((res: Response) => res.json()));
  }

  postSamplecollection(sampledata) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(sampledata);
    return this.http
      .post(this.urlData + 'fhir/Specimen', body, options)
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }

  getSampleCollected(orgId, orgUnitId, orderId, deptId, offset, range) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(
        this.urlData + 'HIS-TEST/LIS/transaction/getCollectedSample/1/1/8/0/10'
      )
      .pipe(map((res: Response) => res.json()));
  }

  // getSampleCollectedDummy(scanId) {
  //   // let profile={"status":"In SendToCR"}
  //   let headers = new Headers({ "Content-Type": "application/json" });
  //   let options = new RequestOptions({ headers: headers });
  //   // console.log("scanID:"+scanId);
  //   let body = JSON.stringify(scanId);
  //   //  console.log("scanID:"+body);
  //   return this.http
  //     .get("assets/data/db.json")
  //     .pipe(map((res: Response) => res.json()));
  // }

  getCrOPList(orgId, orgUnitId, orderId, deptId, offset, range) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // return this.http.get(this.urlData+'HIS-TEST/LIS/centralReceiving/getSampleListForInOutPatient/'+orgId+'/'+orgUnitId+'/'+orderId+'/'+deptId+'/'+offset+'/'+range).pipe(map((res: Response) => res.json()));

    return this.http
      .get('assets/data/opsample.json')
      .pipe(map((res: Response) => res.json()));
  }
  getCrOPListCount(orgId, orgUnitId, orderId, deptId) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(
        this.urlData +
        'HIS-TEST/LIS/centralReceiving/getTotalRecordOutPatient/' +
        orgId +
        '/' +
        orgUnitId +
        '/' +
        orderId
      )
      .pipe(map((res: Response) => res.json()));
  }
  getResultEntry(orgId, orgUnitId, orderId, deptId, offset, range) {
    const profile = {
      orgId: '1',
      orgUnitId: '1',
      offset: 0,
      recordPerPage: 10,
      deptId: 8,
      subDeptId: 5
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/ResultEntry',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  getCrCentrifugationList(orgId, orgUnitId, deptId, offset, range) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(
        this.urlData +
        'HIS-TEST/LIS/centralReceiving/getCentrifugationWorklist/' +
        orgId +
        '/' +
        orgUnitId +
        '/' +
        deptId +
        '/' +
        offset +
        '/' +
        range
      )
      .pipe(map((res: Response) => res.json()));
  }
  getCrCentrifugationListCount(orgId, orgUnitId, orderId, deptId) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(
        this.urlData +
        'HIS-TEST/LIS/centralReceiving/getTotalcentrifugationWorkListRecord/' +
        orgId +
        '/' +
        orgUnitId +
        '/' +
        orderId
      )
      .pipe(map((res: Response) => res.json()));
  }
  getResultEntryDetails(
    orgId,
    orgUnitId,
    testId,
    testType,
    deptId,
    subDeptId,
    ageInDays,
    labSampleNo,
    genderID,
    panelID
  ) {
    const profile = [
      {
        orgId: orgId,
        orgUnitId: orgUnitId,
        testId: testId,
        testType: testType,
        deptId: deptId,
        subDeptId: subDeptId,
        patientAgeDays: ageInDays,
        labSampleNo: labSampleNo,
        genderId: genderID,
        panelId: panelID
      }
    ];
    console.log(profile);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/ResultEntry/Details',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  getPendingAcceptanceBCList(
    orgId,
    orgUnitId,
    deptId,
    subDeptId,
    offset,
    range
  ) {
    const profile = {
      orgId: orgId,
      orgUnitId: orgUnitId,
      offset: offset,
      recordPerPage: range,
      deptId: deptId,
      subDeptId: subDeptId
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    // return this.http.post(this.urlData+'HIS-TEST/LIS/BioChemistry/Aacceptance/Pending',body, options).pipe(map((res: Response) => res.json())).catch(this.errorHandler);

    return this.http
      .get('assets/data/biopending.json')
      .pipe(map((res: Response) => res.json()));
  }
  getPendingAcceptanceBCListCount(orgId, orgUnitId, deptId, subDeptId) {
    const profile = {
      orgId: orgId,
      orgUnitId: orgUnitId,
      deptId: deptId,
      subDeptId: subDeptId
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/Aacceptance/Pending/Count',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  getResultEntryListCount(orgId, orgUnitId, deptId, subDeptId) {
    const profile = {
      orgId: orgId,
      orgUnitId: orgUnitId,
      deptId: deptId,
      subDeptId: subDeptId
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/ResultEntry/Count',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  getResultValidationList(orgId, orgUnitId, orderId, deptId, offset, range) {
    const profile = {
      orgId: '1',
      orgUnitId: '1',
      offset: 0,
      recordPerPage: 10,
      deptId: 8,
      subDeptId: 5
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/ValidationWorkList',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  getResultValidationListCount(orgId, orgUnitId, deptId, subDeptId) {
    const profile = {
      orgId: orgId,
      orgUnitId: orgUnitId,
      deptId: deptId,
      subDeptId: subDeptId
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/ValidationWorkList/Count',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  getResultValidationDetails(
    orgId,
    orgUnitId,
    testId,
    testType,
    deptId,
    subDeptId,
    ageInDays,
    labSampleNo,
    labResultId,
    genderID,
    panelID
  ) {
    const profile = [
      {
        orgId: orgId,
        orgUnitId: orgUnitId,
        testId: testId,
        testType: testType,
        deptId: deptId,
        subDeptId: subDeptId,
        patientAgeDays: ageInDays,
        labSampleNo: labSampleNo,
        labResultId: labResultId,
        genderId: genderID,
        panelId: panelID
      }
    ];
    console.log(profile);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/ValidationWorkList/Details',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  saveAcceptRejectSample(e, orgId, orgUnitId, deptId, subDeptId, result) {
    console.log(e);
    const profile = [
      {
        labSampleDtlsId: e.labSampleDtlsId,
        orgId: orgId,
        orgUnitId: orgUnitId,
        testId: '',
        deptId: deptId,
        subDeptId: subDeptId,
        deptName: '',
        labSampleId: '',
        sampleBarcode: '',
        sampleId: '',
        sampleNo: '',
        orderDetailsId: '',
        orderId: '',
        orderQty: '',
        serviceId: '',
        testCode: '',
        testDesc: '',
        sampleName: '',
        sampleVolume: '',
        unitName: '',
        profileId: '',
        panelCode: '',
        packageId: '',
        isCentrifugationReq: e.isCentrifugationReq,
        isAlliquoteReq: e.isAlliquoteReq,
        sampleTypeId: '',
        containerId: '',
        containerName: '',
        sampleReqCount: '',
        samplePendingCount: e.samplePendingCount,
        sampleGenDatetime: '',
        sampleGenBy: '',
        currStatus: result,
        sampleStatusId: '',
        isOutsourced: '',
        outsourcedLabId: '',
        sampleSendtocrDatetime: '',
        sampleSendtocrBy: '',
        sampleCollectionDatetime: '',
        sampleCollectionBy: '',
        sampleCentrifugationDatetime: '',
        sampleCentrifugationBy: '',
        sampleAcceptDatetime: '',
        sampleAcceptBy: 5,
        sampleRejectDatetime: '',
        sampleRejectBy: '',
        sampleRejectReasonId: '',
        sampleRejectReason: '',
        sampleRecollectFlag: '',
        sampleRecollectAgainstId: '',
        createdBy: 5,
        createdDate: '',
        updatedBy: 5,
        updatedDate: '',
        sampleTestTime: '',
        patientVisitAge: '',
        genderId: '',
        visitType: '',
        listTMicroSampleMediaDto: []
      }
    ];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/centralReceiving/acceptOrRejectSample',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  saveAcceptBCSample(e, orgId, orgUnitId, deptId, subDeptId, result) {
    console.log(e);
    const profile = [
      {
        labSampleDtlsId: e.labSampleDtlsId,
        orgId: orgId,
        orgUnitId: orgUnitId,
        testId: '',
        deptId: deptId,
        subDeptId: subDeptId,
        deptName: '',
        labSampleId: '',
        sampleBarcode: '',
        sampleId: '',
        sampleNo: '',
        orderDetailsId: '',
        orderId: '',
        orderQty: '',
        serviceId: '',
        testCode: '',
        testDesc: '',
        sampleName: '',
        sampleVolume: '',
        unitName: '',
        profileId: '',
        panelCode: '',
        packageId: '',
        isCentrifugationReq: e.isCentrifugationReq,
        isAlliquoteReq: e.isAlliquoteReq,
        sampleTypeId: '',
        containerId: '',
        containerName: '',
        sampleReqCount: '',
        samplePendingCount: e.samplePendingCount,
        sampleGenDatetime: '',
        sampleGenBy: '',
        currStatus: result,
        sampleStatusId: '',
        sampWrkStatusId: '',
        isOutsourced: '',
        outsourcedLabId: '',
        sampleSendtocrDatetime: '',
        sampleSendtocrBy: '',
        sampleCollectionDatetime: '',
        sampleCollectionBy: '',
        sampleCentrifugationDatetime: '',
        sampleCentrifugationBy: '',
        sampleAcceptDatetime: '',
        sampleAcceptBy: 5,
        sampleRejectDatetime: '',
        sampleRejectBy: '',
        sampleRejectReasonId: '',
        sampleRejectReason: '',
        sampleRecollectFlag: '',
        sampleRecollectAgainstId: '',
        createdBy: 5,
        createdDate: '',
        updatedBy: 5,
        updatedDate: '',
        sampleTestTime: '',
        patientVisitAge: '',
        genderId: '',
        visitType: '',
        listTMicroSampleMediaDto: []
      }
    ];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/Biochemistry/Pending/Sample',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  saveBCWorklist(e, orgId, orgUnitId, deptId, subDeptId, result) {
    console.log(e);
    const profile = [
      {
        labSampleDtlsId: e.labSampleDtlsId,
        orgId: orgId,
        orgUnitId: orgUnitId,
        testId: '',
        deptId: deptId,
        subDeptId: subDeptId,
        deptName: '',
        labSampleId: '',
        sampleBarcode: '',
        sampleId: '',
        sampleNo: '',
        orderDetailsId: '',
        orderId: '',
        orderQty: '',
        serviceId: '',
        testCode: '',
        testDesc: '',
        sampleName: '',
        sampleVolume: '',
        unitName: '',
        profileId: '',
        panelCode: '',
        packageId: '',
        isCentrifugationReq: e.isCentrifugationReq,
        isAlliquoteReq: e.isAlliquoteReq,
        sampleTypeId: '',
        containerId: '',
        containerName: '',
        sampleReqCount: '',
        samplePendingCount: e.samplePendingCount,
        sampleGenDatetime: '',
        sampleGenBy: '',
        currStatus: result,
        sampleStatusId: 16,
        sampWrkStatusId: '',
        isOutsourced: '',
        outsourcedLabId: '',
        sampleSendtocrDatetime: '',
        sampleSendtocrBy: '',
        sampleCollectionDatetime: '',
        sampleCollectionBy: '',
        sampleCentrifugationDatetime: '',
        sampleCentrifugationBy: '',
        sampleAcceptDatetime: '',
        sampleAcceptBy: 5,
        sampleRejectDatetime: '',
        sampleRejectBy: '',
        sampleRejectReasonId: '',
        sampleRejectReason: '',
        sampleRecollectFlag: '',
        sampleRecollectAgainstId: '',
        createdBy: 5,
        createdDate: '',
        updatedBy: 5,
        updatedDate: '',
        sampleTestTime: '',
        patientVisitAge: '',
        genderId: '',
        visitType: '',
        listTMicroSampleMediaDto: []
      }
    ];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/Worklist/ReportEntry',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  saveReportEnrtyValidation(
    orgId,
    orgUnitId,
    deptId,
    subDeptId,
    listLabSampleResultDetailsMaster,
    e,
    tempRowData
  ) {
    const profile = [
      {
        labTestResId: tempRowData.labTestResId,
        orgId: '1' /*tempRowData.orgId*/,
        orgUnitId: '1' /*tempRowData.orgUnitId*/,
        testId: tempRowData.testId,
        deptId: tempRowData.deptId,
        patientId: tempRowData.patientId,
        visitTypeId: tempRowData.visitTypeId,
        visitAdmId: tempRowData.visitAdmId,
        orderDetailsId: tempRowData.orderDetailsId,
        sampleNo: tempRowData.sampleNo,
        labSampleDtlsId: tempRowData.labSampleDtlsId,
        resultEnterDatetime: tempRowData.resultEnterDatetime,
        resultEnterBy: tempRowData.resultEnterBy,
        resultValidatedDatetime: tempRowData.resultValidatedDatetime,
        resultValidatedBy: tempRowData.resultValidatedBy,
        resultAuthorisedDatetime: tempRowData.resultAuthorisedDatetime,
        resultAuthorisedBy: tempRowData.resultAuthorisedBy,
        resultAuthorisedFlag: tempRowData.resultAuthorisedFlag,
        resultHandoverDatetime: tempRowData.resultHandoverDatetime,
        resultHandoverBy: tempRowData.resultHandoverBy,
        suggetionNotes: tempRowData.suggetionNotes,
        footsNotes: tempRowData.footsNotes,
        sampleStatusId: 6 /*tempRowData.sampleStatusId*/,
        createdBy: 1,
        createdDate: tempRowData.createdDate,
        updatedBy: 1 /*tempRowData.updatedBy*/,
        updatedDate: tempRowData.updatedDate,
        resultLevel: 1 /*tempRowData.resultLevel*/,
        reportType: tempRowData.reportType,
        deptName: tempRowData.deptName,
        sampleBarcode: tempRowData.sampleBarcode,
        labSampleNo: tempRowData.labSampleNo,
        subDeptId: tempRowData.subDeptId,
        visitType: tempRowData.visitType,
        panelCode: tempRowData.panelCode,
        uhid: tempRowData.uhid,
        patientDetails: tempRowData.patientDetails,
        doctorDetails: tempRowData.doctorDetails,
        testDesc: tempRowData.testDesc,
        priorityName: tempRowData.priorityName,
        colorCode: tempRowData.colorCode,
        testType: tempRowData.testType,
        patientAgeDays: tempRowData.patientAgeDays,
        offset: tempRowData.offset,
        recordPerPage: tempRowData.recordPerPage,
        patientAgeInYears: tempRowData.patientAgeInYears,
        patientGender: tempRowData.patientGender,
        printReport: tempRowData.printReport,
        sampleRecollectFlag: tempRowData.sampleRecollectFlag,
        sampleRecollectAgainstId: tempRowData.sampleRecollectAgainstId,
        orderDateTime: tempRowData.orderDateTime,
        sampleCollectionDatetime: tempRowData.sampleCollectionDatetime,
        panelId: tempRowData.panelId,
        genderId: tempRowData.genderId,
        wardCode: tempRowData.wardCode,
        bedNumber: tempRowData.bedNumber,
        sampleType: tempRowData.sampleType,
        testCode: tempRowData.testCode,
        retestCount: tempRowData.retestCount,
        listLabSampleResultDetailsMaster: listLabSampleResultDetailsMaster
      }
    ];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    console.log(profile);
    // return "";
    return this.http
      .post(
        this.urlData +
        'HIS-TEST/LIS/BioChemistry/ValidationWorkList/EntryDetails',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  saveReportEnrty(
    orgId,
    orgUnitId,
    deptId,
    subDeptId,
    listLabSampleResultDetailsMaster,
    e,
    tempRowData
  ) {
    const profile = [
      {
        labTestResId: tempRowData.labTestResId,
        orgId: tempRowData.orgId,
        orgUnitId: tempRowData.orgUnitId,
        testId: tempRowData.testId,
        deptId: tempRowData.deptId,
        patientId: tempRowData.patientId,
        visitTypeId: tempRowData.visitTypeId,
        visitAdmId: tempRowData.visitAdmId,
        orderDetailsId: tempRowData.orderDetailsId,
        sampleNo: tempRowData.sampleNo,
        labSampleDtlsId: tempRowData.labSampleDtlsId,
        resultEnterDatetime: tempRowData.resultEnterDatetime,
        resultEnterBy: tempRowData.resultEnterBy,
        resultValidatedDatetime: tempRowData.resultValidatedDatetime,
        resultValidatedBy: tempRowData.resultValidatedBy,
        resultAuthorisedDatetime: tempRowData.resultAuthorisedDatetime,
        resultAuthorisedBy: tempRowData.resultAuthorisedBy,
        resultAuthorisedFlag: tempRowData.resultAuthorisedFlag,
        resultHandoverDatetime: tempRowData.resultHandoverDatetime,
        resultHandoverBy: tempRowData.resultHandoverBy,
        suggetionNotes: tempRowData.suggetionNotes,
        footsNotes: tempRowData.footsNotes,
        sampleStatusId: 6 /*tempRowData.sampleStatusId*/,
        createdBy: 1,
        createdDate: tempRowData.createdDate,
        updatedBy: 1 /*tempRowData.updatedBy*/,
        updatedDate: tempRowData.updatedDate,
        resultLevel: 1 /*tempRowData.resultLevel*/,
        reportType: tempRowData.reportType,
        deptName: tempRowData.deptName,
        sampleBarcode: tempRowData.sampleBarcode,
        labSampleNo: tempRowData.labSampleNo,
        subDeptId: tempRowData.subDeptId,
        visitType: tempRowData.visitType,
        panelCode: tempRowData.panelCode,
        uhid: tempRowData.uhid,
        patientDetails: tempRowData.patientDetails,
        doctorDetails: tempRowData.doctorDetails,
        testDesc: tempRowData.testDesc,
        priorityName: tempRowData.priorityName,
        colorCode: tempRowData.colorCode,
        testType: tempRowData.testType,
        patientAgeDays: tempRowData.patientAgeDays,
        offset: tempRowData.offset,
        recordPerPage: tempRowData.recordPerPage,
        patientAgeInYears: tempRowData.patientAgeInYears,
        patientGender: tempRowData.patientGender,
        printReport: tempRowData.printReport,
        sampleRecollectFlag: tempRowData.sampleRecollectFlag,
        sampleRecollectAgainstId: tempRowData.sampleRecollectAgainstId,
        orderDateTime: tempRowData.orderDateTime,
        sampleCollectionDatetime: tempRowData.sampleCollectionDatetime,
        panelId: tempRowData.panelId,
        genderId: tempRowData.genderId,
        wardCode: tempRowData.wardCode,
        bedNumber: tempRowData.bedNumber,
        sampleType: tempRowData.sampleType,
        testCode: tempRowData.testCode,
        retestCount: tempRowData.retestCount,
        listLabSampleResultDetailsMaster: listLabSampleResultDetailsMaster
      }
    ];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    console.log(profile);
    return this.http
      .post(
        this.urlData + 'HIS-TEST/LIS/BioChemistry/ResultEntry/EntryDetails',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  sendToCr(orgId, orgUnitId, orderId, deptId, e) {
    const profile = [
      {
        labSampleDtlsId: e.labSampleDtlsId,
        orgId: '1', // e.orgId,
        orgUnitId: '1', // e.orgUnitId,
        testId: '',
        deptId: 8, // e.,
        subDeptId: '',
        deptName: '', // e.deptName,
        labSampleId: '',
        sampleBarcode: '',
        sampleId: '',
        sampleNo: '', // e.labSampleNo,
        orderDetailsId: '',
        orderId: '',
        orderQty: '',
        serviceId: '',
        testCode: '', // e.testCode,
        testDesc: '', // e.testDesc,
        sampleName: '', // e.sampleName,
        sampleVolume: '', // e.sampleVolume,
        unitName: '', // e.unitName,
        profileId: '', // e.profileId,
        panelCode: '', // e.panelCode,
        packageId: '', // e.packageId,
        isCentrifugationReq: '', // e.isCentrifugationReq,
        isAlliquoteReq: '', // e.isAlliquoteReq,
        sampleTypeId: '', // e.sampleTypeId,
        containerId: '', // e.containerId,
        containerName: '', // e.containerName,
        sampleReqCount: '', // e.sampleReqCount,
        samplePendingCount: '', // e.samplePendingCount,
        sampleGenDatetime: '', // e.sampleGenDatetime,
        sampleGenBy: '', // e.sampleGenBy,
        currStatus: '', // e.currStatus,
        sampleStatusId: 12, // e.sampleStatusId,
        isOutsourced: '', // e.isOutsourced,
        outsourcedLabId: '', // e.outsourcedLabId,
        sampleSendtocrDatetime: '', // e.sampleSendtocrDatetime,
        sampleSendtocrBy: 5, // e.sampleSendtocrBy,
        sampleCollectionDatetime: '', // e.sampleCollectionDatetime,
        sampleCollectionBy: '', // e.sampleCollectionBy,
        sampleCentrifugationDatetime: '', // e.sampleCentrifugationDatetime,
        sampleCentrifugationBy: '', // e.sampleCentrifugationBy,
        sampleAcceptDatetime: '', // e.sampleAcceptDatetime,
        sampleAcceptBy: '', // e.sampleAcceptBy,
        sampleRejectDatetime: '', // e.sampleRejectDatetime,
        sampleRejectBy: '', // e.sampleRejectBy,
        sampleRejectReasonId: '', // e.sampleRejectReasonId,
        sampleRejectReason: '', // e.sampleRejectReason,
        sampleRecollectFlag: '', // e.sampleRecollectFlag,
        sampleRecollectAgainstId: '', // e.sampleRecollectAgainstId,
        createdBy: 5,
        createdDate: '', // e.createdDate,
        updatedBy: 5,
        updatedDate: '', // e.updatedDate,
        sampleTestTime: '', // e.sampleTestTime,
        patientVisitAge: '', // e.patientVisitAge,
        genderId: '', // e.genderId,
        visitType: '', // e.visitType,
        listTMicroSampleMediaDto: []
      }
    ];
    console.log(profile);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(this.urlData + 'HIS-TEST/LIS/transaction/sendToCr', body, options)
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }
  getRejectReasonList(orgId) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.urlData + 'HIS-TEST/LIS/common/getRejectionReasonList/' + orgId)
      .pipe(map((res: Response) => res.json()));
  }

  getWorklistResultRelease(
    deptId,
    subDeptId,
    orgId,
    orgUnitId,
    offset,
    recordPerPage
  ) {
    const profile = {
      deptId: deptId,
      subDeptId: subDeptId,
      orgId: orgId,
      orgUnitId: orgUnitId,
      offset: offset,
      recordPerPage: recordPerPage
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        'http://34.212.228.82:8080/HIS-TEST/LIS/BioChemistry/ReportReleaseWorkList',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }

  getWorklistResultReleaseCount(orgId, orgUnitId, deptId, subDeptId) {
    const profile = {
      orgId: orgId,
      orgUnitId: orgUnitId,
      deptId: deptId,
      subDeptId: subDeptId
    };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    return this.http
      .post(
        'http://34.212.228.82:8080/HIS-TEST/LIS/BioChemistry/ReportReleaseWorkList/Count',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }

  getMacroscopicExamList() {
    const profile = [
      { orgId: '1', orgUnitId: '1', deptId: 8, subDeptId: 9, searchKeyword: '' }
    ];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify({
      orgId: '1',
      orgUnitId: '1',
      offset: 0,
      recordPerPage: 10,
      deptId: 8,
      subDeptId: 9
    });
    return this.http
      .post(
        'http://13.126.135.186:8080/HIS-TEST/LIS/histopathology/Specimans',
        body,
        options
      )
      .pipe(map((res: Response) => res.json())).pipe(
      catchError(this.errorHandler));
  }

  getAutocompleteData(): Observable<any[]> {
    return this.httpClient.get<any>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }

  errorHandler(error: Response) {
    return observableThrowError(error || 'Error !!');
  }
}
