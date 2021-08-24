import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { DxDataGridComponent, DxLookupComponent } from 'devextreme-angular';
import { ItemLocation, Items, ItemStoreBalance, Lookup, StockAdjustment, storeTransfer } from 'src/Tabels/tabels-list';
import { ItemsPage } from '../items/items.page';
import { BalanceService } from '../Service/balance.service';
import { ItemLocationService } from '../Service/item-location.service';
import { ItemsService } from '../Service/items.service';
import { LineItemsService } from '../Service/line-items.service';
import { LookupService } from '../Service/lookup.service';
import { SharedService } from '../Service/shared.service';
import { StockAdjustmentService } from '../Service/stock-adjustment.service';
import { StoreTransferService } from '../Service/store-transfer.service';

@Component({
  selector: 'app-store-transfer',
  templateUrl: './store-transfer.page.html',
  styleUrls: ['./store-transfer.page.scss'],
})
export class StoreTransferPage implements OnInit {
  @ViewChild("simpleLookup", { static: false }) simpleLookup: DxLookupComponent;
  currentDate = new Date().toUTCString();
  selectedDate = new Date().toISOString();
  minDate = new Date().toISOString();
  maxDate = new Date().toISOString();
  regform = this.fb.group({});
  usePicker = false;
  listOfLookup: Lookup[];
  listofItems: Items[];
  ListOfItems: any[] = [];
  searchText: string;
  currentIndex = -1;
  y: number;
  orderQty: number;
  selectedItemKeys: any[] = [];
  listOfData: any[] = [];
  olddata: any;
  calculateSheet: boolean = false;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  defferenceData: any[] = [];
  listOfItemsData: boolean = true;
  editMode: boolean = false;
  isenabled: boolean;
  isAddItems: boolean = true;
  ToLocation: string;
  FromLocation: string;
  selectedLookupId: string;
  storetransferNo: string = "0";
  newData: any;
  listOfBalance: ItemStoreBalance[];
  listItemLocation: ItemLocation[];
  listStockAdjustment: StockAdjustment[];
  listOfStoreTransfer: storeTransfer[];
  fromStore: string;
  toStore: string;
  constructor(private fb: FormBuilder, private lookupService: LookupService,
    private itemsService: ItemsService, private shardService: SharedService,
    private itemLocationService: ItemLocationService, private balanceService: BalanceService,
    private lineItemsService: LineItemsService, private modalController: ModalController,
    private alertController: AlertController, private storeTransferService: StoreTransferService,
    private stockAdjustmentService: StockAdjustmentService) {
    //setting min date
    let date: Date = new Date();
    date.setDate(date.getDate() - 5);
    this.minDate = date.toISOString();
    //setting max date
    date = new Date();
    date.setDate(date.getDate() + 5);
    this.maxDate = date.toISOString();
  }
  ngOnInit() {
    this.regform = this.fb.group({
      FromLocation: ['', Validators.required],
      ToLocation: ['', Validators.required],
      date: ['', Validators.required],
      transferNo: [''],
      item: ['']
    });
    this.getItems();
    this.getLookup();
    this.getItemAddBySelected();
    this.readStoretransferId();
    this.getBalance();
    this.getItemLocation();
    this.getStockAdjustment();
    this.getStoreTransfer()
    this.getFillData();
    
  }
  getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.name;
  }
  readStoretransferId() {
    this.storetransferNo = "0";
    let No = 0;
    this.storeTransferService.getAllStoreTransfer().subscribe((result) => {
      if (result.length == 0) No = 1;
      else No = result.length + 1;
      this.storetransferNo = "0";
      let padStart = this.storetransferNo.padStart(4, "0")
      this.storetransferNo = "ST-" + padStart + No;
    });
  }
  getStoreTransfer() {
    this.storeTransferService.getAllStoreTransfer().subscribe(res => {
      this.listOfStoreTransfer = res;
    })
  }
  
  getFillData() {
    this.shardService.TranscationType.subscribe((res) => {
      this.storeTransferService.getAllStoreTransfer().subscribe(result => {
        this.listOfStoreTransfer = result;
        let data = this.listOfStoreTransfer.filter(c => c.storeTransferId == res.Order_Number)
        data.forEach(element => {
          this.fromStore = this.listOfLookup.find(c => c.id == element.fromStoreId).name;
          this.toStore = this.listOfLookup.find(c => c.id == element.toStoreId).name
          let datalist = {
            name: this.listofItems.find(c => c.id == element.itemId).name,
            AmaricName: this.listofItems.find(c => c.id == element.itemId).AmaricName,
            quantity: element.quantity,
            From_Location: this.fromStore,
            To_Location: this.toStore
          }
          this.ListOfItems.push(datalist);
          console.log(this.ListOfItems)
          this.regform.get("FromLocation").setValue(element.fromStoreId);
          this.regform.get("ToLocation").setValue(element.toStoreId);
          this.regform.get("date").setValue(res.date);
          this.regform.get("transferNo").setValue(res.Order_Number);
        });
  
      })
 
    })
  }
  getLookup() {
    this.lookupService.getLookUpByType("x1m0C0g3LcBv3pVmtdbf").subscribe(res => {
      this.listOfLookup = res;
    })
  }
  getItems() {
    this.itemsService.getAllItem().subscribe(result => {
      this.listofItems = result;
    })
  }
  getBalance() {
    this.balanceService.getAllBalance().subscribe(res => {
      this.listOfBalance = res;
    })
  }
  getItemLocation() {
    this.itemLocationService.getAllItemLocation().subscribe(res => {
      this.listItemLocation = res;
    })
  }
  getStockAdjustment() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(res => {
      this.listStockAdjustment = res;
    })
  }
  save() {
    let assignId = localStorage.getItem("userId");
    this.ListOfItems.forEach(el => {
      let toStoreId = this.regform.get("ToLocation").value;
      let fromStoreId = this.regform.get("FromLocation").value;
      let data = {
        itemId: el.id,
        quantity: el.quantity,
        storeTransferId: this.storetransferNo,
        date: this.currentDate,
        toStoreId: toStoreId,
        fromStoreId: fromStoreId,
        AssignTo: assignId
      }
      this.storeTransferService.create(data);
      //update Balance store item from fromStore data
      let FromStore = this.listOfBalance.find(c => c.itemId == el.id && c.storeId == fromStoreId);
      if (FromStore !== undefined) {
        let dataOfBalanceStore = {
          itemId: FromStore.itemId,
          beginingQuantity: FromStore.beginingQuantity,
          currentQuantity: FromStore.currentQuantity - el.quantity,
          storeId: FromStore.storeId,
        }
        this.balanceService.updateBalance(dataOfBalanceStore, FromStore.id);
      }
      else {
        let dataOfBalanceStore = {
          itemId: el.id,
          beginingQuantity: 0,
          currentQuantity: - el.quantity,
          storeId: fromStoreId,
        }
        this.balanceService.create(dataOfBalanceStore);
      }

      //update Balance store item from toStore data
      let ToStore = this.listOfBalance.find(c => c.itemId == el.id && c.storeId == toStoreId);
      if (ToStore !== undefined) {
        let dataOfBalanceStore1 = {
          itemId: ToStore.itemId,
          beginingQuantity: ToStore.beginingQuantity,
          currentQuantity: ToStore.currentQuantity + el.quantity,
          storeId: ToStore.storeId,
        }
        this.balanceService.updateBalance(dataOfBalanceStore1, ToStore.id);
      }
      else {
        let dataOfBalanceStore1 = {
          itemId: el.id,
          beginingQuantity: 0,
          currentQuantity: el.quantity,
          storeId: toStoreId,
        }
        this.balanceService.create(dataOfBalanceStore1);
      }
      //Update itemlocation from FromStore data
      let FromStoreL = this.listItemLocation.find(c => c.itemId == el.id && c.location == fromStoreId);
      if (FromStoreL !== undefined) {
        let updateFromStoreItem = {
          itemId: FromStoreL.itemId,
          location: FromStoreL.location,
          quantity: parseInt(FromStoreL.quantity) - el.quantity
        }
        this.itemLocationService.updateItemLoaction(updateFromStoreItem, FromStoreL.id);
      }
      else {
        let createFromStoreItem = {
          itemId: el.id,
          location: fromStoreId,
          quantity: -el.quantity
        }
        this.itemLocationService.create(createFromStoreItem);
      }
      //Update itemlocation from ToStore data
      let ToStoreL = this.listItemLocation.find(c => c.itemId == el.id && c.location == toStoreId);
      if (ToStore !== undefined) {
        let updateToStoreItem = {
          itemId: ToStoreL.itemId,
          location: ToStoreL.location,
          quantity: parseInt(ToStoreL.quantity) + el.quantity
        }
        this.itemLocationService.updateItemLoaction(updateToStoreItem, ToStoreL.id);
      }
      else {
        let createToStoreItem = {
          itemId: el.id,
          location: toStoreId,
          quantity: el.quantity
        }
        this.itemLocationService.create(createToStoreItem);
      }
      //Add stock Adjustment
      let stockAdjust1 = this.listStockAdjustment.find(c => c.itemId == el.id && c.store == fromStoreId)
      if (stockAdjust1 !== undefined) {
        let stock1 = {
          transactionType: "Store Transfer Send",
          transactionNumber: this.storetransferNo,
          itemId: el.id,
          store: fromStoreId,
          QuantityBefore: stockAdjust1.QuantityAfter,
          QuantityAfter: stockAdjust1.QuantityAfter - el.quantity,
          Quantity: -el.quantity,
          date: this.currentDate
        }
        this.stockAdjustmentService.create(stock1)
      }
      else {
        let stock1 = {
          transactionType: "Store Transfer Send",
          transactionNumber: this.storetransferNo,
          itemId: el.id,
          store: fromStoreId,
          QuantityBefore: 0,
          QuantityAfter: -el.quantity,
          Quantity: -el.quantity,
          date: this.currentDate
        }
        this.stockAdjustmentService.create(stock1)
      }

      //Add stock Adjustment
      let stockAdjust = this.listStockAdjustment.find(c => c.itemId == el.id && c.store == toStoreId)
      if (stockAdjust !== undefined) {
        let stock = {
          transactionType: "Store Transfer Receive",
          transactionNumber: this.storetransferNo,
          itemId: el.id,
          store: toStoreId,
          QuantityBefore: stockAdjust.QuantityAfter,
          QuantityAfter: stockAdjust.QuantityAfter + el.quantity,
          Quantity: el.quantity,
          date: this.currentDate
        }
        this.stockAdjustmentService.create(stock)
      }
      else {
        let stock = {
          transactionType: "Store Transfer Receive",
          transactionNumber: this.storetransferNo,
          itemId: el.id,
          store: toStoreId,
          QuantityBefore: 0,
          QuantityAfter: el.quantity,
          Quantity: el.quantity,
          date: this.currentDate
        }
        this.stockAdjustmentService.create(stock)
      }
    });
    this.regform.get("FromLocation").reset();
    this.regform.get("ToLocation").reset();
    this.regform.get("item").reset();
    this.ListOfItems = [];
  }
  getItemAddBySelected() {
    this.shardService.listOfItemAdd.subscribe(result => {
      result.forEach(el => {
        let itemid = el.id
        if (this.regform.valid) {
          let fromL = this.regform.get("FromLocation").value;
          this.FromLocation = this.listOfLookup.find(c => c.id == fromL).name
          let toL = this.regform.get("ToLocation").value
          this.ToLocation = this.listOfLookup.find(c => c.id == toL).name
          let value = {
            id: this.listofItems.find(c => c.id == itemid).id,
            name: this.listofItems.find(c => c.id == itemid).name,
            AmaricName: this.listofItems.find(c => c.id == itemid).AmaricName,
            quantity: 0,
            From_Location: this.FromLocation,
            To_Location: this.ToLocation
          }
          this.ListOfItems.push(value);
        }
        else {
          this.presentAlert("please enter all fields");
        }
      });
    })
  }
  valueChanged($event) {
    this.selectedLookupId = $event.value;
    if (this.selectedLookupId !== null) {
      let oldid = this.listofItems.find(c => c.id == $event.value).id;
      let id = this.ListOfItems.find(c => c.id == oldid);
      if (id) {
      }
      else {
        if (this.regform.valid) {
          let fromL = this.regform.get("FromLocation").value;
          this.FromLocation = this.listOfLookup.find(c => c.id == fromL).name
          let toL = this.regform.get("ToLocation").value
          this.ToLocation = this.listOfLookup.find(c => c.id == toL).name
          let value = {
            id: this.listofItems.find(c => c.id == $event.value).id,
            name: this.listofItems.find(c => c.id == $event.value).name,
            AmaricName: this.listofItems.find(c => c.id == $event.value).AmaricName,
            quantity: 0,
            From_Location: this.FromLocation,
            To_Location: this.ToLocation
          }
          this.ListOfItems.push(value);
        }
        else {
          this.presentAlert("please enter all fields");
        }
      }
    }
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Store Transfer',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  selectionChangedRow(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }
  selectionChanged(data: any) {
    this.isenabled = true;
    this.isAddItems = true;
    let counted_Qty = data.newData.Counted_Qty;
    this.olddata = [];
    this.olddata = data.oldData;
    this.newData = data.newData;
    let findid = this.listOfData.find(c => c.id === this.olddata.id);
    if (!findid) {
      let datalist = {
        id: this.olddata.id,
        Counted_Qty: counted_Qty,
        AmaricName: this.olddata.AmaricName,
        quantity: this.newData.quantity,
        name: this.olddata.name,
        system_Qty: this.olddata.system_Qty
      }
      this.listOfData.push(datalist);
    }
    else {
      let i = this.listOfData.findIndex(x => x.id === findid.id);
      this.listOfData.splice(i, 1);
      let datalist = {
        id: findid.id,
        Counted_Qty: counted_Qty,
        AmaricName: this.olddata.AmaricName,
        quantity: this.newData.quantity,
        name: findid.name,
        system_Qty: findid.system_Qty
      }
      this.listOfData.push(datalist);
      // console.log(this.listOfData);
    }
  }
  deleteRecords() {
    this.selectedItemKeys.forEach((index) => {
      let i = this.ListOfItems.findIndex(x => x.id === index.id);
      this.ListOfItems.splice(i, 1);
    });
    // this.dataGrid.instance.refresh();
  }
  async addItems() {
    const modal = await this.modalController.create({
      component: ItemsPage,
      cssClass: 'my-custom',
      componentProps: {
        y: this.y = 2,
        data: this.ListOfItems,
        selectedLookupId: this.selectedLookupId
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      // console.log('Sending: ',this.values);
      // console.log('Sending: ',this.defaultSelectedCurrency);
    });
  }
  addItem = (e) => {
    this.isAddItems = true;
    this.crateItem();
    this.simpleLookup.instance.close();
  };
  Cancel = () => {
    this.simpleLookup.instance.close();
  };
  async crateItem() {
    const modal = await this.modalController.create({
      component: ItemsPage,
      cssClass: 'my-custom',
      componentProps: {
        y: this.y = 1
      }
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      // console.log('Sending: ',this.values);
      // console.log('Sending: ',this.defaultSelectedCurrency);
    });
  }

}
