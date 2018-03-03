/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { ExtendedUserMyBankAnalyticsComponent } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics.component';
import { ExtendedUserMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics.service';
import { ExtendedUserMyBankAnalytics } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('ExtendedUserMyBankAnalytics Management Component', () => {
        let comp: ExtendedUserMyBankAnalyticsComponent;
        let fixture: ComponentFixture<ExtendedUserMyBankAnalyticsComponent>;
        let service: ExtendedUserMyBankAnalyticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [ExtendedUserMyBankAnalyticsComponent],
                providers: [
                    ExtendedUserMyBankAnalyticsService
                ]
            })
            .overrideTemplate(ExtendedUserMyBankAnalyticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtendedUserMyBankAnalyticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtendedUserMyBankAnalyticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ExtendedUserMyBankAnalytics(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.extendedUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
