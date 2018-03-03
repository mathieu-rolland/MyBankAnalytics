/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { BankAccountMyBankAnalyticsDetailComponent } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics-detail.component';
import { BankAccountMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics.service';
import { BankAccountMyBankAnalytics } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('BankAccountMyBankAnalytics Management Detail Component', () => {
        let comp: BankAccountMyBankAnalyticsDetailComponent;
        let fixture: ComponentFixture<BankAccountMyBankAnalyticsDetailComponent>;
        let service: BankAccountMyBankAnalyticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [BankAccountMyBankAnalyticsDetailComponent],
                providers: [
                    BankAccountMyBankAnalyticsService
                ]
            })
            .overrideTemplate(BankAccountMyBankAnalyticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankAccountMyBankAnalyticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountMyBankAnalyticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BankAccountMyBankAnalytics(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bankAccount).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
