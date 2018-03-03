/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { OperationMyBankAnalyticsDialogComponent } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics-dialog.component';
import { OperationMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics.service';
import { OperationMyBankAnalytics } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics.model';
import { CategoryMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/category-my-bank-analytics';
import { BankAccountMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics';

describe('Component Tests', () => {

    describe('OperationMyBankAnalytics Management Dialog Component', () => {
        let comp: OperationMyBankAnalyticsDialogComponent;
        let fixture: ComponentFixture<OperationMyBankAnalyticsDialogComponent>;
        let service: OperationMyBankAnalyticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [OperationMyBankAnalyticsDialogComponent],
                providers: [
                    CategoryMyBankAnalyticsService,
                    BankAccountMyBankAnalyticsService,
                    OperationMyBankAnalyticsService
                ]
            })
            .overrideTemplate(OperationMyBankAnalyticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperationMyBankAnalyticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperationMyBankAnalyticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OperationMyBankAnalytics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.operation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'operationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OperationMyBankAnalytics();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.operation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'operationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
