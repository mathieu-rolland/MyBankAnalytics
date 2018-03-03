/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { OperationMyBankAnalyticsComponent } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics.component';
import { OperationMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics.service';
import { OperationMyBankAnalytics } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('OperationMyBankAnalytics Management Component', () => {
        let comp: OperationMyBankAnalyticsComponent;
        let fixture: ComponentFixture<OperationMyBankAnalyticsComponent>;
        let service: OperationMyBankAnalyticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [OperationMyBankAnalyticsComponent],
                providers: [
                    OperationMyBankAnalyticsService
                ]
            })
            .overrideTemplate(OperationMyBankAnalyticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperationMyBankAnalyticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperationMyBankAnalyticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new OperationMyBankAnalytics(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.operations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
