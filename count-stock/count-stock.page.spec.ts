import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountStockPage } from './count-stock.page';

describe('CountStockPage', () => {
  let component: CountStockPage;
  let fixture: ComponentFixture<CountStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountStockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
