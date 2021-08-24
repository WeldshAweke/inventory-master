import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {  Customer, ItemStoreBalance, Vocher } from 'src/Tabels/tabels-list';
import { CustomerService } from '../Service/customer.service';
import { AppError } from "../common/app-error";
import { BadInput } from "../common/bad-input";
import { VocherService } from '../Service/vocher.service';
@Component({
  selector: 'app-recieve-payment',
  templateUrl: './recieve-payment.page.html',
  styleUrls: ['./recieve-payment.page.scss'],
})
export class RecievePaymentPage implements OnInit {
  regform = this.fb.group({});
  listOfCustomer: Customer[];
  defaultSelectedCurrency: string;
  filterCustomer: Customer[];
  selectedCustomerBalance: number;
  updateBalance: number;
  recieveBalanceId: string;
  listOfBalance: ItemStoreBalance[];
  id: any;
  Balance: number;
  listOfVoucher: Vocher[];
  customerId: string;
  totalBalance: number;
  balance: number;
  payment: number = 0;
  checkedItems: any[] = [];
  balanceValue: number;
  PaidBalance: number;
  remaining: number;
  btnDisabled: boolean;
  selectAllModeVlaue: string = "page";
  selectionModeValue: string = "all";
  arr_names: string[] = new Array();
  allMode: string;
  checkBoxesMode: string;
  selectedRows: string[];
  selectionChangedBySelectbox: boolean;
  selectedRowKeys: any;
  selectedItemKeys: any[]=[];
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private alertController: AlertController,
    private voucherService: VocherService) {
    this.allMode = 'allPages';
    this.checkBoxesMode = 'onClick'
  }
  ngOnInit() {
    this.regform = this.fb.group({
      customer: ["", Validators.required],
      payment: ["", Validators.required],
      updateBalance: 0
    })
    this.getAllCustomerList();
    //this.getVoucherById();
  }
  public fields: Object = { text: "phonenumber", value: "fullname" };
  public watermark2: string = "Select Customer";
  public height: string = "250px";
  onChange(item) {
    if (this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value) => value != item);
    }
    else {
      this.checkedItems.push(item)
    }
    this.payment = 0;
    this.PaidBalance = 0;
    this.checkedItems.forEach(list => {
      this.payment = +this.payment + list.subTotal;
      this.PaidBalance = this.payment;
      this.remaining = this.totalBalance - this.PaidBalance;
    })
  }
  
  getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.fullname + " " + item.phonenumber;
  }
  getAllCustomerList() {
    this.customerService.getAllCustomer().subscribe(res => {
      if(res.length>0){
        this.listOfCustomer = res;
        this.defaultSelectedCurrency = this.listOfCustomer[0].id;
        this.customerId = this.defaultSelectedCurrency;
        if (this.customerId !== null) {
          this.voucherService.getVocherByCustomerID(this.customerId).subscribe(res => {
            this.listOfVoucher = res;
          })
        }
      }
  else{
    this.AlertInternet();
  }
    })
  }
  getVoucherById(customerId: string) {
    this.totalBalance = 0; this.balance = 0;
    if (this.customerId !== null) {
      this.voucherService.getVocherByCustomerID(customerId).subscribe(res => {
        this.listOfVoucher = res;
        if (res.length == 0) {
          this.balance = this.updateBalance;
        }
        else {
          this.listOfVoucher.forEach(element => {
            this.totalBalance = +this.totalBalance + element.subTotal
            this.balance = this.totalBalance + this.updateBalance;
          });
        }
        //console.log(res)
      })
    }

  }
  onKey() {
    this.Balance = this.updateBalance + this.totalBalance - this.regform.get("payment").value;
  }
  SelectedValue($event) {
    const newValue = $event.value;
    const previousValue = $event.previousValue;
    this.id = newValue || previousValue;
    this.filterCustomer = this.listOfCustomer.filter(c => c.id == this.id);
    this.selectedCustomerBalance = this.filterCustomer[0].balance;
    this.payment = 0;
    this.checkedItems.splice(0);
    this.updateBalance = this.selectedCustomerBalance;
    this.customerId = this.filterCustomer[0].id;
    this.getVoucherById(this.customerId);
  }

  reCalculateBalance() {
    {
      if (this.regform.valid) {
        if (!this.recieveBalanceId) {
          let updateCustomerData = {
            fullname: this.filterCustomer[0].fullname,
            phonenumber: this.filterCustomer[0].phonenumber,
            location: this.filterCustomer[0].location,
            balance: this.updateBalance - this.payment,
            address: this.filterCustomer[0].address
          }
          this.checkedItems.forEach(list => {
            list.forEach(element => {
              let voucherList = {
                vocherId: element.vocherId,
                subTotal: element.subTotal,
                taxAmount: element.taxAmount,
                grandTotal: element.grandTotal,
                date: element.date,
                vocherTypeId: element.vocherTypeId,
                vendor: element.vendor,
                userId: element.userId,
                PaymentStatus: 'paid'
              }
              this.voucherService.updateVocher(voucherList, element.id)
            });
          })
          this.customerService.updateCustomer(updateCustomerData, this.defaultSelectedCurrency).then(
            () =>
              (error: AppError) => {
                if (error instanceof BadInput) {
                  this.regform.setErrors(error.originalError);
                }
                else throw error;
              }
          );
        }
        this.regform.reset();
        this.recieveBalanceId = "";
        this.presentAlert(" Sucess");
      }
      else {
        this.presentAlert("Please enter all fields");
      }
    }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recive payment',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  selectionChangedHandler(event) {
    this.checkedItems=[];
    //let currentIndex = event.currentSelectedRowKeys;
    //this.selectedRows = [];
    // currentIndex.forEach(element => {
     // let addedItems = event.selectedRowsData.filter(c => c.id == element);
     let addedItems = event.selectedRowsData;
      if (this.checkedItems.includes(addedItems)) {
        this.checkedItems = this.checkedItems.filter((value) => value != addedItems);
      }
      else {
        this.checkedItems.push(addedItems)
        this.selectedRows.push(event.selectedRowKeys);
      }
      this.payment = 0;
      this.PaidBalance = 0;
      this.checkedItems.forEach(list => {
        list.forEach(element => {
          this.payment = +this.payment + element.subTotal;
          this.PaidBalance = this.payment;
          this.remaining = this.totalBalance - this.PaidBalance;
        });
      });
    // });
    // if(currentIndex.length<=0){
    //   this.payment = 0;
    // }
 }
 payAllBalance() {
  this.listOfVoucher.forEach(listOfData => {
    this.payment = +this.payment + listOfData.subTotal;
    this.PaidBalance = this.payment;
    this.remaining = this.totalBalance - this.PaidBalance;
  //   this.listOfVoucher.find(c=>c.userId==listOfData.userId)
  //   this.selectedRows.push();
  })
}
selectionChangedRow(data: any) {
  this.selectedItemKeys = data.selectedRowKeys;
}
async AlertInternet() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Internet',
    // subHeader: 'Subtitle',
    message: 'Please turn on wifi or data',
    buttons: ['OK']
  });

  await alert.present();
}
}
