/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { CategoryMyBankAnalyticsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics-delete-dialog.component';
import { CategoryMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics.service';

describe('Component Tests', () => {

    describe('CategoryMyBankAnalytics Management Delete Component', () => {
        let comp: CategoryMyBankAnalyticsDeleteDialogComponent;
        let fixture: ComponentFixture<CategoryMyBankAnalyticsDeleteDialogComponent>;
        let service: CategoryMyBankAnalyticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [CategoryMyBankAnalyticsDeleteDialogComponent],
                providers: [
                    CategoryMyBankAnalyticsService
                ]
            })
            .overrideTemplate(CategoryMyBankAnalyticsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryMyBankAnalyticsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMyBankAnalyticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
