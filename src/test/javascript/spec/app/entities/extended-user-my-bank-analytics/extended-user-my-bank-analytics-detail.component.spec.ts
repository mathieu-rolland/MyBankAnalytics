/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { ExtendedUserMyBankAnalyticsDetailComponent } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics-detail.component';
import { ExtendedUserMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics.service';
import { ExtendedUserMyBankAnalytics } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('ExtendedUserMyBankAnalytics Management Detail Component', () => {
        let comp: ExtendedUserMyBankAnalyticsDetailComponent;
        let fixture: ComponentFixture<ExtendedUserMyBankAnalyticsDetailComponent>;
        let service: ExtendedUserMyBankAnalyticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [ExtendedUserMyBankAnalyticsDetailComponent],
                providers: [
                    ExtendedUserMyBankAnalyticsService
                ]
            })
            .overrideTemplate(ExtendedUserMyBankAnalyticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtendedUserMyBankAnalyticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtendedUserMyBankAnalyticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ExtendedUserMyBankAnalytics(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.extendedUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
