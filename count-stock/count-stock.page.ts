import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { element } from 'protractor';
import { AddStockService } from '../Service/add-stock.service';
import { ItemCategoryService } from '../Service/item-category.service';
import { ItemsService } from '../Service/items.service';
import { LookupService } from '../Service/lookup.service';
import { StockAdjustmentService } from '../Service/stock-adjustment.service';
import { AddStock, ItemCategory, Items, Lookup, StockAdjustment } from 'c:/pro/mtkinvL/mtkinv/MTK-Inv/src/Tabels/tabels-list';
@Component({
  selector: 'app-count-stock',
  templateUrl: './count-stock.page.html',
  styleUrls: ['./count-stock.page.scss'],
})
export class CountStockPage implements OnInit {
  regform = this.fb.group({});
  usePicker: boolean;
  listOfLookup: Lookup[];
  listofItems: Items[];
  listOfCatagory: ItemCategory[];
  listOfCountStock: any[] = [];
  itemSelectedId: any[] = [];
  listOfData: AddStock[];
  storeId: string;
  catagoryId: string;
  itemId: string;
  constructor(private fb: FormBuilder, private platform: Platform,
    private lookupService: LookupService, private itemsService: ItemsService,
    private itemCategoryService: ItemCategoryService,
    private stockAdjustmentService: StockAdjustmentService,
    private alertController: AlertController) { }
  ngOnInit() {
    this.regform = this.fb.group({
      location: ['', Validators.required],
      catagory: ['', Validators.required],
      item: ['', Validators.required]
    });
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')) {
      this.usePicker = true;
    }
    this.getItems();
    this.getLookup();
    this.getCatagory();
    this.getCountStock()
  }
  getDisplayExpr(item) {
    if (!item) {
      return "";
    }
    return item.name;
  }
  getDisplayCatagory(catagory) {
    if (!catagory) {
      return "";
    }
    return catagory.categoryName;
  }
  getLookup() {
    this.lookupService.getLookUpByType("x1m0C0g3LcBv3pVmtdbf").subscribe(res => {
      this.listOfLookup = res;
    });
  }
  getItems() {
    this.itemsService.getAllItem().subscribe(result => {
      this.listofItems = result;
    });
  }
  getCatagory() {
    this.itemCategoryService.getAllItemCategories().subscribe(catagory => {
      this.listOfCatagory = catagory;
      //  console.log(catagory)
    });
  }
  valueChangeItem(ev) {
    this.itemId = ev.value;
    this.listOfCountStock = [];
   this.stockAdjustmentService.getAllStockAdjustment().subscribe(datalist => {
    if (datalist.length > 0) {
        let items = this.listofItems.find(c=>c.id==ev.value)
        this.listOfLookup.forEach(element => {
          let stock = datalist.find(c => c.store == element.id && c.itemId == items.id);
          let catagoryId = this.listofItems.find(c => c.id == items.id).CatagoryId;
          if(stock !==undefined){
            let data = {
              id:items.id,
              item: this.listofItems.find(c => c.id === items.id).name,
              Amharic_Name:items.AmaricName,
              Catagory: this.listOfCatagory.find(c => c.id == catagoryId).categoryName,
              Quantity: stock.QuantityAfter,
              Location: this.listOfLookup.find(c => c.id === stock.store).name,
            }
            this.listOfCountStock.push(data);
           }
        });
      if(this.storeId!==undefined){
        let storeName = this.listOfLookup.find(c=>c.id==this.storeId).name
          this.listOfCountStock = this.listOfCountStock.filter(c => c.Location === storeName);
      }
      if(this.catagoryId !==undefined){
        let catagoryName = this.listOfCatagory.find(c=>c.id==this.catagoryId).categoryName
        this.listOfCountStock = this.listOfCountStock.filter(c => c.Catagory === catagoryName);
      }
    }
    else {
      this.AlertInternet();
    }
  });
  }
  valueChangeStore(ev) {
    this.storeId = ev.value;
    this.listOfCountStock = [];
     this.stockAdjustmentService.getAllStockAdjustment().subscribe(datalist => {
      if (datalist.length > 0) {
        this.listofItems.forEach(ele=>{
            let stock = datalist.find(c => c.store == ev.value && c.itemId == ele.id);
            let catagoryId = this.listofItems.find(c => c.id == ele.id).CatagoryId;
            if(stock !==undefined){
              let data = {
                id:ele.id,
                item: this.listofItems.find(c => c.id === ele.id).name,
                Amharic_Name:ele.AmaricName,
                Catagory: this.listOfCatagory.find(c => c.id == catagoryId).categoryName,
                Quantity: stock.QuantityAfter,
                Location: this.listOfLookup.find(c => c.id === stock.store).name,
              }
              this.listOfCountStock.push(data);
             }
        })
        if(this.itemId!==undefined){
          this.listOfCountStock = this.listOfCountStock.filter(c => c.id === this.itemId);
        }
        if(this.catagoryId !==undefined){
          let catagoryName = this.listOfCatagory.find(c=>c.id==this.catagoryId).categoryName
          this.listOfCountStock = this.listOfCountStock.filter(c => c.Catagory === catagoryName);
        }
      }
      else {
        this.AlertInternet();
      }
    });
  }
  valueChangeCatagory(ev) {
    this.catagoryId = ev.value
    this.listOfCountStock = [];
       this.stockAdjustmentService.getAllStockAdjustment().subscribe(datalist => {
      if (datalist.length > 0) {
       this.listofItems.forEach(ele=>{
          this.listOfLookup.forEach(element => {
            let stock = datalist.find(c => c.store == element.id && c.itemId == ele.id);
            let catagoryId = this.listofItems.find(c => c.id == ele.id).CatagoryId;
            if(stock !==undefined){
              let data = {
                id:ele.id,
                item: this.listofItems.find(c => c.id === ele.id).name,
                Amharic_Name:ele.AmaricName,
                Catagory: this.listOfCatagory.find(c => c.id == catagoryId).categoryName,
                Quantity: stock.QuantityAfter,
                Location: this.listOfLookup.find(c => c.id === stock.store).name,
              }
              this.listOfCountStock.push(data);
             }
           });
        })
        let catagoryName = this.listOfCatagory.find(c=>c.id==ev.value).categoryName
        this.listOfCountStock = this.listOfCountStock.filter(c => c.Catagory === catagoryName);
        if(this.storeId!==undefined){
          let storeName = this.listOfLookup.find(c=>c.id==this.storeId).name
          this.listOfCountStock = this.listOfCountStock.filter(c => c.Location === storeName);
        }
        if(this.itemId !==undefined){
          this.listOfCountStock = this.listOfCountStock.filter(c => c.id === this.itemId);
        }
      }
      else {
        this.AlertInternet();
      }
    });
  }
  getCountStock() {
    this.stockAdjustmentService.getAllStockAdjustment().subscribe(datalist => {
      if (datalist.length > 0) {
        this.listofItems.forEach(ele=>{
          this.listOfLookup.forEach(element => {
            let stock = datalist.find(c => c.store == element.id && c.itemId == ele.id);
            let catagoryId = this.listofItems.find(c => c.id == ele.id).CatagoryId;
            if(stock !==undefined){
              let data = {
                id:ele.id,
                item: this.listofItems.find(c => c.id === ele.id).name,
                Amharic_Name:ele.AmaricName,
                Catagory: this.listOfCatagory.find(c => c.id == catagoryId).categoryName,
                Quantity: stock.QuantityAfter,
                Location: this.listOfLookup.find(c => c.id === stock.store).name,
              }
              this.listOfCountStock.push(data);
               }
           });
        })
      }
      else {
        this.AlertInternet();
      }
    });
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
