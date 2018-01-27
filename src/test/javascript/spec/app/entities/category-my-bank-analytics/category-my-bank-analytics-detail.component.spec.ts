/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { CategoryMyBankAnalyticsDetailComponent } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics-detail.component';
import { CategoryMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics.service';
import { CategoryMyBankAnalytics } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('CategoryMyBankAnalytics Management Detail Component', () => {
        let comp: CategoryMyBankAnalyticsDetailComponent;
        let fixture: ComponentFixture<CategoryMyBankAnalyticsDetailComponent>;
        let service: CategoryMyBankAnalyticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [CategoryMyBankAnalyticsDetailComponent],
                providers: [
                    CategoryMyBankAnalyticsService
                ]
            })
            .overrideTemplate(CategoryMyBankAnalyticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryMyBankAnalyticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMyBankAnalyticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CategoryMyBankAnalytics(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.category).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
