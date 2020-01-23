import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { SharedUiChartModule } from '../shared-ui-chart.module';
import { of } from 'rxjs';

const testingModuleBase = {
  imports: [SharedUiChartModule]
};

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testingModuleBase).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit()', () => {
    it('should create chart', () => {
      (component as any).data$ = of();
      spyOn(component.data$, 'subscribe').and.callThrough();
      (component as any).ngOnInit();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
