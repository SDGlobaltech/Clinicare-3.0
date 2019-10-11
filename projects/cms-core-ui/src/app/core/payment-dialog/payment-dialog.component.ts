import { Component, OnInit, Inject, Input, Pipe } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
  MatTableDataSource
} from "@angular/material";
import { ConfirmDialogComponent } from "../../core/confirm-dialog/confirm-dialog.component";
import { AppBaseService } from "../../services/http.service";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { AuthService } from "./../../services/auth.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-payment-dialog",
  templateUrl: "./payment-dialog.component.html",
  styleUrls: ["./payment-dialog.component.scss"],
  providers: [DatePipe]
})
export class PaymentDialogComponent implements OnInit {
  receivedFrom: string;
  indentificationNumber: string;
  remark: string;
  transferToActive: string;
  unitCode: any;
  unitId: any;
  orgId: any;
  orgCode: any;

  displayedColumsPaymentDetails: string[] = [
    "date",
    "voucherno",
    "deposittype",
    "totalamt",
    "consumeamt",
    "balance"
  ];
  displayedColumnsDeposit = [
    "check",
    "depositno",
    "depositdate",
    "against",
    "encountertype",
    "encounterno",
    // "paymentmode",
    "depositamt",
    "consumeamt",
    "refundamt",
    "balance",
    "collectedby",
    "consume"
  ];
  dataSourceDeposit = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    "paymentmode",
    "currency",
    "amount",
    "number",
    "bank",
    "cardtype",
    "transactiontype",
    "date",
    "action"
  ];
  dataSourcePayment = new MatTableDataSource<any>();
  currencies: any;
  banks: any;
  cardTypes: any;
  transactionTypes: any;
  paymentModes: any;
  deposit: boolean;
  paymentMode: string;
  currency: string;
  amount = 0;
  accountNumber: string;
  bank: string;
  cardType: string;
  transactionType: string;
  paymentDate: any;
  totalDueAmount: number;
  disabled: boolean = true;

  //exchange currency
  exCurrency: any;
  baseCurrency: number;

  //flags
  isCurrencyAdded: boolean;

  paymentForm: FormGroup = this.builder.group({
    paymentMode: [this.paymentMode, Validators.required],
    currency: [this.currency, Validators.required],
    amount: [this.amount, Validators.required],
    accountNumber: [this.accountNumber],
    bank: [this.bank],
    cardType: [this.cardType],
    transactionType: [this.transactionType],
    paymentDate: [this.paymentDate, Validators.required]
  });

  footerForm: FormGroup = this.builder.group({
    receivedFrom: [""],
    indentificationNumber: [""],
    remark: [""],
    transferToActive: [""]
  });
  totalPayment: number = 0;
  depositList: any[];
  patientId: string;
  depositAmount: any;
  refundAmount: any;
  balanceAmount: any;
  consumeAmount: any;
  consumedDeposits: any = [];
  pagename: string;
  consumeTotal: any;
  totalPayAmount: number;
  encounterId: any;
  visitType: string = "OP";
  digitsAfterDecimal: number = 2;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialog: MatDialog,
    private baseservice: AppBaseService,
    private builder: FormBuilder,
    public datepipe: DatePipe,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    private httpService: HttpClient
  ) {
    this.deposit = dialogData.deposit;
    this.amount = dialogData.amount;
    this.baseCurrency = dialogData.amount;
    this.totalDueAmount = dialogData.amount;
    this.patientId = dialogData.patientId;
    this.pagename = dialogData.pagename;
    if (dialogData.visitType) this.visitType = dialogData.visitType;
    this.encounterId = dialogData.encounterId ? dialogData.encounterId : "";
    if (this.deposit) {
      this.getDeposits();
    }
  }

  roundOffDecimal(num: number): number {
    num = isNaN(num) ? 0 : num;
    if (num > 0) {
      let round = (Math.round(num * 100) / 100).toFixed(
        this.digitsAfterDecimal
      );
      return parseFloat(round);
    } else return 0;
  }

  round(num) {
    return this.roundOffDecimal(num);
  }

  getDeposits() {
    this.depositAmount = 0;
    this.refundAmount = 0;
    this.consumeTotal = 0;
    this.balanceAmount = 0;
    this.depositList = [];
    this.baseservice.setResourceURL("/sdgt-billing-service/");
    this.baseservice
      .getResource(
        "/deposit/person/" +
          this.patientId +
          "?visitType=" +
          this.visitType +
          "&visitId=" +
          this.encounterId
      )
      .subscribe(res => {
        if (res && res.length > 0) {
          res.forEach(element => {
            var balance =
              element.depositAmt - element.depositConsume - element.refundAmt;
            this.depositList.push({
              checked: false,
              depositid: element.id,
              depositno: element.depositNo,
              depositdate: element.depositDate,
              patientName: element.patientName,
              against: element.depositAginst,
              encountertype: element.visitType,
              encounterno: element.visitNo,
              paymentmode: element.paymentMode,
              depositamt: element.depositAmt,
              consumeamt: element.depositConsume,
              refundamt: element.refundAmt,
              balance: balance,
              collectedby: element.collectedBy,
              payments: element.listpaymentdetails,
              consumedAmount: 0
            });
            this.depositAmount += element.depositAmt;
            this.refundAmount += element.refundAmt;
            this.consumeTotal += element.depositConsume;
            this.balanceAmount += balance;
          });
        }
        this.dataSourceDeposit = new MatTableDataSource<any>(this.depositList);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.isCurrencyAdded = false;
    const _this = this;
    this.authService.getUnit().then(function(value: any) {
      _this.unitId = value.unitId;
      _this.orgId = value.orgId;
      _this.unitCode = value.unitCode;
      _this.orgCode = value.orgCode;
    });
    this.getPaymentMode();
    this.getCurreny();
    this.getBank();
    this.getCardType();
    this.getExchangecurrency();

    this.paymentForm
      .get("paymentMode")
      .valueChanges.subscribe(data => this.onPaymentModeChange(data));
    this.paymentDate = this.datepipe.transform(new Date(), "dd-MMM-yyyy");
  }

  getExchangecurrency() {
    this.httpService.get("./assets/data/currency_rate.json").subscribe(
      res => {
        this.exCurrency = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  onPaymentModeChange(value: any) {
    let paymentDate = this.paymentForm.get("paymentDate");
    paymentDate.disable();

    if (value) {
      let accountNumber = this.paymentForm.get("accountNumber");
      let bank = this.paymentForm.get("bank");
      let cardType = this.paymentForm.get("cardType");
      let transactionType = this.paymentForm.get("transactionType");

      let paymentMode = this.paymentModes.find(i => i.id == value);
      if (paymentMode) {
        accountNumber.setValue("");
        if (paymentMode.documentno) {
          accountNumber.setValidators([Validators.required]);
          accountNumber.enable();
        } else {
          accountNumber.setValidators([]);
          accountNumber.disable();
        }

        bank.setValue("");
        if (paymentMode.bankName) {
          bank.setValidators([Validators.required]);
          bank.enable();
        } else {
          bank.setValidators([]);
          bank.disable();
        }

        cardType.setValue("");
        if (paymentMode.cardType) {
          cardType.setValidators([Validators.required]);
          cardType.enable();
        } else {
          cardType.setValidators([]);
          cardType.disable();
        }

        transactionType.setValue("");
        if (paymentMode.trsanType) {
          transactionType.setValidators([Validators.required]);
          transactionType.enable();
        } else {
          transactionType.setValidators([]);
          transactionType.disable();
        }
      }

      accountNumber.updateValueAndValidity();
      bank.updateValueAndValidity();
      cardType.updateValueAndValidity();
      transactionType.updateValueAndValidity();
    }
  }

  removePaymentRow(index) {
    const payments = this.dataSourcePayment;
    payments.data.splice(index, 1);
    this.dataSourcePayment = new MatTableDataSource<any>(payments.data);
    this.calculateTotalPayment();
    if (this.dataSourcePayment.data.length <= 0) {
      this.isCurrencyAdded = false;
    }
  }

  getCurreny(): any {
    this.baseservice.setResourceURL("/masters-service/");
    this.baseservice.getResource("Masters/CurrencyMaster").subscribe(res => {
      this.currencies = res;
      this.currency = res[0].id;
    });
  }

  getBank(): any {
    this.baseservice.setResourceURL("/masters-service/");
    this.baseservice.getResource("Masters/BankMaster").subscribe(res => {
      this.banks = res;
    });
  }

  getCardType(): any {
    this.baseservice.setResourceURL("/masters-service/");
    this.baseservice.getResource("Masters/CardTypeMaster").subscribe(res => {
      this.cardTypes = res;
    });
  }

  getPaymentMode(): any {
    this.baseservice.setResourceURL("/masters-service/");
    this.baseservice.getResource("Masters/PaymentModeMaster").subscribe(res => {
      this.paymentModes = res;
      this.paymentMode = res[0].id;
    });
  }

  addPayment() {
    //To check whether the amount is negative
    if (this.amount <= 0) {
      this.snackBar.open("Warning", "Amount should be greater than zero", {
        duration: 3000
      });
      return false;
    } else if (this.paymentForm.valid) {
      let tempamount = this.totalDueAmount - this.totalPayment;
      let subAmount = tempamount - this.amount;
      if (subAmount < 0) {
        this.snackBar.open(
          "Warning",
          "Total amount cannot exceed payable amount " + this.totalDueAmount,
          {
            duration: 3000
          }
        );
        return;
      } else {
        if (this.validateTotal()) {
          this.isCurrencyAdded = true;
          let paymentMode = this.paymentForm.value.paymentMode;
          if (paymentMode) {
            paymentMode = this.paymentModes.find(function check(data) {
              return data.id == paymentMode;
            });
          } else {
            paymentMode = { id: "", desc: "" };
          }

          let currency = this.paymentForm.value.currency;
          if (currency) {
            currency = this.currencies.find(function check(data) {
              return data.id == currency;
            });
          } else {
            currency = { id: "", desc: "" };
          }

          let bank = this.paymentForm.value.bank;
          if (bank) {
            bank = this.banks.find(function check(data) {
              return data.id == bank;
            });
          } else {
            bank = { id: "", desc: "" };
          }

          let cardType = this.paymentForm.value.cardType;
          if (cardType) {
            cardType = this.cardTypes.find(function check(data) {
              return data.id == cardType;
            });
          } else {
            cardType = { id: "", desc: "" };
          }

          let transactionType = this.paymentForm.value.transactionType;
          if (transactionType) {
            transactionType = this.transactionTypes.find(function check(data) {
              return data.id == transactionType;
            });
          } else {
            transactionType = { id: "", desc: "" };
          }

          const data = this.dataSourcePayment.data;
          data.push({
            paymentmode: paymentMode,
            currency: currency,
            amount: this.paymentForm.value.amount,
            number: this.paymentForm.value.accountNumber,
            bank: bank,
            cardtype: cardType,
            transactiontype: transactionType,
            date: this.datepipe.transform(new Date(), "dd-MMM-yyyy"),
            action: null
          });
          this.dataSourcePayment = new MatTableDataSource<any>(data);
          this.calculateTotalPayment();
          //this.paymentForm.reset();
          let amount = this.totalDueAmount - this.totalPayment;
          if (amount > 0) this.amount = amount;
          else this.amount = 0;
        }
      }
    }
  }

  validateTotal() {
    const amount = this.amount;
    let total = this.calculateTotal(this.dataSourcePayment.data, "amount");
    total = +total + +this.amount;
    if (total > this.totalDueAmount) {
      this.snackBar.open(
        "Warning",
        "Total amount cannot exceed payable amount " + this.totalDueAmount,
        {
          duration: 3000
        }
      );
      return false;
    } else {
      return true;
    }
  }

  consumeDeposit() {
    let consumeTotal = 0;
    let validation = true;
    let data = this.dataSourcePayment.data;
    let currency = this.paymentForm.value.currency;
    if (currency) {
      currency = this.currencies.find(function check(data) {
        return data.id == "MALAYSIA";
      });
      if (!currency) currency = { id: "", desc: "" };
    } else {
      currency = { id: "", desc: "" };
    }

    this.consumedDeposits.forEach(element => {
      if (parseFloat(element.consumedAmount) > parseFloat(element.balance)) {
        validation = false;
      }
      data.push({
        paymentmode: { id: "0", desc: "Deposit" },
        currency: { id: "", desc: "MALAYSIA" },
        amount: element.consumedAmount,
        number: "",
        bank: "",
        cardtype: "",
        transactiontype: "",
        date: this.datepipe.transform(element.depositdate, "dd/MM/yyyy"),
        check: null
      });
      consumeTotal = consumeTotal + parseFloat(element.consumedAmount);
    });

    if (validation) {
      if (consumeTotal + this.totalPayment > this.totalDueAmount) {
        this.snackBar.open(
          "Warning",
          "Total amount cannot exceed payable amount " + this.totalDueAmount,
          {
            duration: 3000
          }
        );
      } else {
        this.dataSourcePayment = new MatTableDataSource<any>(data);
        this.totalPayAmount = this.calculateTotal(
          this.dataSourcePayment.data,
          "amount"
        );
        this.totalPayment =
          this.totalPayAmount + parseFloat(this.consumeAmount);
      }
    } else {
      this.snackBar.open(
        "Warning",
        "Cannot consume more than available deposit amount",
        {
          duration: 3000
        }
      );
    }
  }

  consumeOnCheck(checked, index) {
    if (!checked) {
      let data = this.dataSourceDeposit.data;
      data[index].consumedAmount = 0;
      this.dataSourceDeposit = new MatTableDataSource<any>(data);
    }
    this.calculateConsume();
  }

  consumeOnKeyUp(index) {
    let totalConsume = this.depositList
      .filter(i => i.checked)
      .reduce((sum, item) => sum + parseFloat(item.consumedAmount), 0);
    if (totalConsume + this.totalPayAmount > this.totalDueAmount) {
      let data = this.dataSourceDeposit.data;
      data[index].consumedAmount = 0;
      this.dataSourceDeposit = new MatTableDataSource<any>(data);
    }
    this.calculateConsume();
  }

  calculateConsume() {
    this.consumeAmount = this.depositList
      .filter(i => i.checked)
      .reduce((sum, item) => sum + parseFloat(item.consumedAmount), 0);
    this.calculateTotalPayment();
  }

  calculateTotal(list, variable) {
    let sum = 0;
    list.forEach(element => {
      sum = sum + parseFloat(element[variable]);
    });
    return sum;
  }

  validateAmount() {
    let validation = true;
    if (
      this.pagename == "deposit" &&
      this.totalDueAmount != this.totalPayment
    ) {
      this.snackBar.open(
        "Warning",
        "Payment amount be equal to payable amount",
        {
          duration: 3000
        }
      );
      validation = false;
    } else if (
      (this.pagename == "opbill" || this.pagename == "selfsettlement") &&
      this.totalDueAmount < this.totalPayment
    ) {
      this.snackBar.open(
        "Warning",
        "Payment amount cannot be greater than Billing amount",
        {
          duration: 3000
        }
      );
      validation = false;
    }

    return validation;
  }

  getSelectedDeposits() {
    let deposits = [];
    this.dataSourceDeposit.data.forEach(element => {
      if (element.checked) {
        deposits.push(element);
      }
    });

    return deposits;
  }

  openConfirmDialog() {
    if (this.footerForm.valid) {
      if (this.validateAmount()) {
        const dialogRefConfirm = this.dialog.open(ConfirmDialogComponent, {
          width: "350px",
          data: { confirm: "no" }
        });
        dialogRefConfirm.afterClosed().subscribe(result => {
          if (result.confirm == "yes") {
            const data = {
              payments: this.dataSourcePayment.data,
              identificationNumber: this.indentificationNumber,
              receivedFrom: this.receivedFrom,
              remark: this.remark,
              deposits: this.getSelectedDeposits(),
              paidAmoumt: this.totalPayment
            };
            this.dialogRef.close(data);
          }
        });
      }
    }
  }

  calculateTotalPayment() {
    let consumeAmount = isNaN(this.consumeAmount)
      ? 0
      : parseFloat(this.consumeAmount);
    this.totalPayAmount = this.calculateTotal(
      this.dataSourcePayment.data,
      "amount"
    );
    this.totalPayment = this.totalPayAmount + consumeAmount;
    this.amount = this.totalDueAmount - consumeAmount;
  }

  onCurrencyChange(event) {
    let currencyCode = "";
    if (event.value == 1) {
      currencyCode = "MYR";
      this.amount = this.baseCurrency;
      this.totalDueAmount = this.baseCurrency;
    } else if (event.value == 2) {
      currencyCode = "HKD";
    } else if (event.value == 3) {
      currencyCode = "USD";
    }
    if (this.amount > 0 && currencyCode != "MYR") {
      let rateData = this.exCurrency.rates[currencyCode]
        ? this.exCurrency.rates[currencyCode]
        : 0;
      if (rateData > 0) {
        this.amount = this.baseCurrency * rateData;
        this.totalDueAmount = this.baseCurrency * rateData;
      }
    }
  }
}

export interface DialogData {
  deposit: boolean;
  payments: any;
  receivedFrom: string;
  identificationNumber: string;
  remark: string;
  amount: number;
  patientId: string;
  pagename: string;
  encounterId: string;
  visitType: string;
}

export interface Deposit {
  date: string;
  voucherno: string;
  deposittype: string;
  totalamt: string;
  consumeamt: string;
  balance: string;
}

export interface Payment {
  paymentmode: string;
  currency: string;
  amount: string;
  number: string;
  bank: string;
  cardtype: string;
  transactiontype: string;
  date: string;
  action: string;
}

export class ExtraValidators {
  static conditional(conditional, validator) {
    return function(control) {
      revalidateOnChanges(control);

      if (control && control._parent) {
        if (conditional(control._parent)) {
          return validator(control);
        }
      }
    };
  }
}

function revalidateOnChanges(control): void {
  if (control && control._parent && !control._revalidateOnChanges) {
    control._revalidateOnChanges = true;
    control._parent.valueChanges
      .distinctUntilChanged((a, b) => {
        // These will always be plain objects coming from the form, do a simple comparison
        if ((a && !b) || (!a && b)) {
          return false;
        } else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
          return false;
        } else if (a && b) {
          for (let i in a) {
            if (a[i] !== b[i]) {
              return false;
            }
          }
        }
        return true;
      })
      .subscribe(() => {
        control.updateValueAndValidity();
      });

    control.updateValueAndValidity();
  }
  return;
}
