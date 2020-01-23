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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
