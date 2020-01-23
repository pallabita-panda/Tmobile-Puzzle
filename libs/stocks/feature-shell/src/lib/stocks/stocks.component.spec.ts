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
    it('should create chart', () => {
      (component as any).ngOnInit();
      (component as any).stockPickerForm.valueChanges.subscribe(() => {
        expect((component as any).fetchQuote).toBeCalled();
      });
    });
  });

  describe('fetchQuote()', () => {
    it('should fetch data', () => {
      component.stockPickerForm.patchValue({ symbol: 'AAL', period: '5y' });
      spyOn((component as any).priceQuery, 'fetchQuote').and.returnValue(
        of({})
      );
      (component as any).fetchQuote();
      expect((component as any).priceQuery.fetchQuote).toHaveBeenCalled();
    });
  });
});
