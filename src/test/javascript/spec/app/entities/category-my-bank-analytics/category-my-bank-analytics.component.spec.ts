/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { CategoryMyBankAnalyticsComponent } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics.component';
import { CategoryMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics.service';
import { CategoryMyBankAnalytics } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('CategoryMyBankAnalytics Management Component', () => {
        let comp: CategoryMyBankAnalyticsComponent;
        let fixture: ComponentFixture<CategoryMyBankAnalyticsComponent>;
        let service: CategoryMyBankAnalyticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [CategoryMyBankAnalyticsComponent],
                providers: [
                    CategoryMyBankAnalyticsService
                ]
            })
            .overrideTemplate(CategoryMyBankAnalyticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryMyBankAnalyticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMyBankAnalyticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CategoryMyBankAnalytics(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.categories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
