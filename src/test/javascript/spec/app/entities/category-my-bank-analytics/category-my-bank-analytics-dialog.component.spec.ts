/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { CategoryMyBankAnalyticsDialogComponent } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics-dialog.component';
import { CategoryMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics.service';
import { CategoryMyBankAnalytics } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics/category-my-bank-analytics.model';
import { OperationMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics';

describe('Component Tests', () => {

    describe('CategoryMyBankAnalytics Management Dialog Component', () => {
        let comp: CategoryMyBankAnalyticsDialogComponent;
        let fixture: ComponentFixture<CategoryMyBankAnalyticsDialogComponent>;
        let service: CategoryMyBankAnalyticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [CategoryMyBankAnalyticsDialogComponent],
                providers: [
                    OperationMyBankAnalyticsService,
                    CategoryMyBankAnalyticsService
                ]
            })
            .overrideTemplate(CategoryMyBankAnalyticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryMyBankAnalyticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryMyBankAnalyticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CategoryMyBankAnalytics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.category = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CategoryMyBankAnalytics();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.category = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'categoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
