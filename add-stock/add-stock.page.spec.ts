import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddStockPage } from './add-stock.page';

describe('AddStockPage', () => {
  let component: AddStockPage;
  let fixture: ComponentFixture<AddStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
