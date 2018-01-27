/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { OperationMyBankAnalyticsDetailComponent } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics-detail.component';
import { OperationMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics.service';
import { OperationMyBankAnalytics } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('OperationMyBankAnalytics Management Detail Component', () => {
        let comp: OperationMyBankAnalyticsDetailComponent;
        let fixture: ComponentFixture<OperationMyBankAnalyticsDetailComponent>;
        let service: OperationMyBankAnalyticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [OperationMyBankAnalyticsDetailComponent],
                providers: [
                    OperationMyBankAnalyticsService
                ]
            })
            .overrideTemplate(OperationMyBankAnalyticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperationMyBankAnalyticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperationMyBankAnalyticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OperationMyBankAnalytics(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.operation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
