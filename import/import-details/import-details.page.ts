import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-import-details',
  templateUrl: './import-details.page.html',
  styleUrls: ['./import-details.page.scss'],
})
export class ImportDetailsPage implements OnInit {
  @Input() public data;
  @Input() public type;
  @Input() public datalist;
  importData: any[]=[];
  dataList: any[]=[];
  regform=this.fb.group({})
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.regform = this.fb.group({
      fullname: [''],
      phonenumber: [''],
      location: [''],
      balance: [''],
      address: ['']
    });
    this.importData = Object.assign(this.data); 
    this.dataList = Object.assign(this.datalist);
     console.log(this.importData)
    // console.log(this.type)
  }
  trackByFn(index: any, item: any) {
    return index;
  }

}
