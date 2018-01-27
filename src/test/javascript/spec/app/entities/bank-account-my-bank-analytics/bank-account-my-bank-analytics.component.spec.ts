/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { BankAccountMyBankAnalyticsComponent } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics.component';
import { BankAccountMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics.service';
import { BankAccountMyBankAnalytics } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('BankAccountMyBankAnalytics Management Component', () => {
        let comp: BankAccountMyBankAnalyticsComponent;
        let fixture: ComponentFixture<BankAccountMyBankAnalyticsComponent>;
        let service: BankAccountMyBankAnalyticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [BankAccountMyBankAnalyticsComponent],
                providers: [
                    BankAccountMyBankAnalyticsService
                ]
            })
            .overrideTemplate(BankAccountMyBankAnalyticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankAccountMyBankAnalyticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountMyBankAnalyticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BankAccountMyBankAnalytics(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bankAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
