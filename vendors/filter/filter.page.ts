import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/Service/shared.service';
import { VendorsService } from 'src/app/Service/vendors.service';
import { Vendors } from 'src/Tabels/tabels-list';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  regform=this.fb.group({});
  listOfVendors: Vendors[];
  constructor(private fb:FormBuilder,private modalController:ModalController,
    private vendorService:VendorsService,private shardService:SharedService) { }

  ngOnInit() {
    this.regform=this.fb.group({
      vendorName:[''],
      address:[''],
      email:[''],
      website:[''],
      });
  }
  apply(){
    this.vendorService.getAllVendor().subscribe(result => {
      this.listOfVendors = result;
      let vendorName = this.regform.get("vendorName").value;
      let address = this.regform.get("address").value;
      let email = this.regform.get("email").value;
      let website = this.regform.get("website").value;
      if(vendorName!=null&&vendorName!=""){
        this.listOfVendors = this.listOfVendors.filter(c=>c.vendorName===vendorName);
      }
      else if(address!=null&&address!=""){
        this.listOfVendors = this.listOfVendors.filter(c=>c.address===address);
      }
      else if(email!=null&&email!=""){
        this.listOfVendors = this.listOfVendors.filter(c=>c.email===email);
      }
      else{
        this.listOfVendors  = this.listOfVendors.filter(c=>c.website===website);
      }
      this.shardService.listOfVendorFromFilter.next(this.listOfVendors);
    });
    this.modalController.dismiss();
  }
  reset(){
  this.regform.reset();
  }
}
