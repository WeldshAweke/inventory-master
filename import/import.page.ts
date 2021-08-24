import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../Service/customer.service';
import { ItemsService } from '../Service/items.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImportDetailsPage } from './import-details/import-details.page';
import { SharedService } from '../Service/shared.service';
import { ItemLocationService } from '../Service/item-location.service';
import { StockAdjustmentService } from '../Service/stock-adjustment.service';
import { BalanceService } from '../Service/balance.service';
import { ItemLocation, Items, ItemStoreBalance, StockAdjustment } from 'src/Tabels/tabels-list';
@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage implements OnInit {
  selectedFile: any;
  regform = this.fb.group({});
  customerList: { fullname: any; phonenumber: any; location: any; balance: any; address: any; };
  result: any[] = [];
  itemsList: { name: any; AmaricName: any; discrption: any; CatagoryId: any; type: any; price: any; cost: any; Quantity: any; picture: any; storeid: any; brand: any; remark: any; };
  fileReaded: any;
  columnFileds: any[] = [];
  dataType: any;
  id: any;
  listOfItemLocation: ItemLocation[];
  listOfStockAdjust: StockAdjustment[];
  listOfBalanceStore: ItemStoreBalance[];
  listOfItems: Items[];
  currentDate = new Date().toUTCString();
  selectedDate = new Date().toUTCString();
  minDate = new Date().toISOString();
  maxDate = new Date().toISOString();
  AddItemNo: string = "0";
  x: number;
  itemId: any;
  stockNo: string;
  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private itemService: ItemsService,
    private shardService: SharedService,
    private modalController: ModalController,
    private alertController: AlertController,
    private itemLocationService: ItemLocationService,
    private stockAdjustmentService: StockAdjustmentService,
    private balanceService: BalanceService) { }

  ngOnInit() {
    this.regform = this.fb.group({
      dataType: ['', Validators.required],
      file: ['', Validators.required],
      date: ['']
    });
    //setting min date
    let date: Date = new Date();
    date.setDate(date.getDate() - 5);
    this.minDate = date.toISOString();
    //setting max date
    date = new Date();
    date.setDate(date.getDate() + 5);
    this.maxDate = date.toISOString();
    this.getItemLocation();
    this.getBalanceStoreItem();
    this.getStockAdjustment();
    this.getItems();
    this.readItemId()
  }
  // onFileChangeToJson(ev) {
  //   let workBook = null;
  //   let jsonData = null;
  //   const reader = new FileReader();
  //   const file = ev.target.files[0];
  //   reader.onload = (event) => {
  //     const data = reader.result;
  //     workBook = XLSX.read(data, { type: 'binary' });
  //     jsonData = workBook.SheetNames.reduce((initial, name) => {
  //       const sheet = workBook.Sheets[name];
  //       initial[name] = XLSX.utils.sheet_to_json(sheet);
  //       return initial;
  //     }, {});
  //     const dataString = JSON.stringify(jsonData);
  //    // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
  //     this.csvJSON(dataString);
  //     console.log(dataString);
  //   }

  //   reader.readAsBinaryString(file);
  // }
  readItemId() {
    let No = 0;
    this.stockAdjustmentService.getAllStockAdjustment().subscribe((result) => {
      if (result.length == 0) No = 1;
      else No = result.length + 1;
      this.stockNo = "0";
      let padStart = this.stockNo.padStart(4, "0")
      this.AddItemNo = "SA-" +padStart + No;
    });
  }
  getItemLocation() {
    this.itemLocationService.getAllItemLocation().subscribe(res => {
      this.listOfItemLocation = res;
    })
  }
  getStockAdjustment() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(res => {
      this.listOfStockAdjust = res;
    })
  }
  getBalanceStoreItem() {
    this.balanceService.getAllBalance().subscribe(res => {
      this.listOfBalanceStore = res;
    })
  }
  getItems() {
    this.itemService.getAllItem().subscribe(res => {
      this.listOfItems = res;
    })
  }
 onFileChange(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result;
      this.csvJSON(text);
    }
    reader.readAsText(this.selectedFile);
  }
  public csvJSON(csv) {
    var lines = csv.split(/\r|\n|\r/);
    this.result = [];
    var headers = lines[0].split(",");
    this.columnFileds = headers;
    for (var i = 1; i < lines.length - 1; i++) {

      let currentline = lines[i].split(",");
      if (currentline.length === headers.length) {
        let obj = [];
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
          //obj.push(currentline[j]);
        }
        this.result.push(obj);
      }
    }
    return JSON.stringify(this.result); //JSON
  }
  // csv2Array(fileInput: any){
  //   //read file from input

  //    reader.onload = (e) => {
  //    let csv: string = reader.result;
  //    let allTextLines = csv.split(/\r|\n|\r/);
  //    let headers = allTextLines[0].split(',');
  //    let lines = [];
  //     for (let i = 0; i < allTextLines.length; i++) {
  //       // split content based on comma
  //       let data = allTextLines[i].split(',');
  //       if (data.length === headers.length) {
  //         let tarr = [];
  //         for (let j = 0; j < headers.length; j++) {
  //           tarr.push(data[j]);
  //         }

  //        // log each row to see output 
  //        console.log(tarr);
  //        lines.push(tarr);
  //     }
  //    }
  //    // all rows in the csv file 
  //    console.log(">>>>>>>>>>>>>>>>>", lines);
  //   } 
  //   }
  Canel() {

  }
  async openDetailImport() {
    let dataType = this.regform.get("dataType").value;
    const modal = await this.modalController.create({
      component: ImportDetailsPage,
      cssClass: 'my-custom',
      componentProps: {
        data: this.columnFileds,
        datalist: this.result,
        type: dataType
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      //console.log('Sending: ',item);
    });
  }
  Save() {
    this.dataType = this.regform.get("dataType").value;
    if (this.dataType == "items") {
      this.result.forEach(element => {
        this.itemsList = {
          name: element.name,
          AmaricName: element.AmaricName,
          discrption: element.discrption,
          CatagoryId: element.CatagoryId,
          type: element.type,
          price: parseInt(element.price),
          Quantity: parseInt(element.Quantity),
          cost: parseInt(element.cost),
          picture: element.picture,
          storeid: element.storeid,
          brand: element.brand,
          remark: element.remark,
        }
        this.itemService.create(this.itemsList)
         this.shardService.itemsId.subscribe(currentId => {
           console.log(currentId)
         if(this.itemId==currentId){
           this.x = 1;
         }
         else{
           this.x = 0;
         }
          //to Add item location
          if(this.x==0){
            let item = this.listOfItems.find(c => c.id == currentId);
            let dataObj = {
                itemId: currentId,
                location: item.storeid,
                quantity: item.Quantity
              }
              this.itemLocationService.create(dataObj);
            //to add Balance Store item
              let balance = {
                itemId: currentId,
                beginingQuantity: item.Quantity,
                currentQuantity: item.Quantity,
                storeId: item.storeid,
              }
              this.balanceService.create(balance);
           
            //Add stock Adjustment
              let stock = {
                transactionType: "Stock Adjustment",
                transactionNumber: this.AddItemNo,
                itemId: currentId,
                store: item.storeid,
                QuantityBefore: 0,
                QuantityAfter: item.Quantity,
                Quantity: item.Quantity,
                date: this.selectedDate
              }
              this.stockAdjustmentService.create(stock)
              this.x = this.x+1;
              this.itemId = currentId
          }
     
          
         });
      });
    }
    else {
      this.result.forEach(element => {
        this.customerList = {
          fullname: element.fullname,
          phonenumber: element.phonenumber,
          location: element.location,
          balance: element.balance,
          address: element.address
        }
        this.customerService.create(this.customerList);

      });
    }
    this.presentAlert();
    this.regform.reset();
  }
  // getItemsLocation(id: string) {
  //   //to Add item location
  //   let item = this.listOfItems.find(c => c.id == id);
  //   let dataObj = {
  //     itemId: id,
  //     location: item.storeid,
  //     quantity: item.Quantity
  //   }
  //   this.itemLocationService.create(dataObj);
  //   //to add Balance Store item
  //   let balance = {
  //     itemId: id,
  //     beginingQuantity: item.Quantity,
  //     currentQuantity: item.Quantity,
  //     storeId: item.storeid,
  //   }
  //   this.balanceService.create(balance);
  //   //Add stock Adjustment
  //   let stock = {
  //     transactionType: "Stock Adjustment",
  //     transactionNumber: this.AddItemNo,
  //     itemId: id,
  //     store: item.storeid,
  //     QuantityBefore: 0,
  //     QuantityAfter: item.Quantity,
  //     Quantity: item.Quantity,
  //     date: this.currentDate
  //   }
  //   this.stockAdjustmentService.create(stock)

  // }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.dataType,
      message: this.dataType + ' Import successfully.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
