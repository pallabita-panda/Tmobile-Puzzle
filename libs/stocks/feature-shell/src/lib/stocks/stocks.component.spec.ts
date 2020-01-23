import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StocksComponent } from './stocks.component';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StocksFeatureShellModule } from '../stocks-feature-shell.module';
import { of } from 'rxjs';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  class MockPriceQueryFacade {
    fetchQuote = jest.fn();
  }

  const testingModuleBase = {
    providers: [
      {
        provide: PriceQueryFacade,
        useClass: MockPriceQueryFacade
      }
    ],
    imports: [StocksFeatureShellModule]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule(testingModuleBase).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit()', () => {
    it('should call ngOnInit()', () => {
      (component as any).ngOnInit();
      // (component as any).stockPickerForm.valueChanges.subscribe(() => {
        //expect((component as any).fetchQuote).toBeCalled();
      //});
    });
  });

  describe('fetchQuote()', () => {
    it('should fetch data', () => {
      component.stockPickerForm.patchValue({ symbol: 'AAL', fromDate: new Date("Sun May 11,2018"), toDate: new Date("Sun May 10,2018") });
      spyOn((component as any).priceQuery, 'fetchQuote').and.returnValue(
        of({})
      );
      (component as any).fetchQuote();
      expect((component as any).priceQuery.fetchQuote).toHaveBeenCalled();
    });
  });
});
