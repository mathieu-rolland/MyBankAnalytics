/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { OperationMyBankAnalyticsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics-delete-dialog.component';
import { OperationMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/operation-my-bank-analytics/operation-my-bank-analytics.service';

describe('Component Tests', () => {

    describe('OperationMyBankAnalytics Management Delete Component', () => {
        let comp: OperationMyBankAnalyticsDeleteDialogComponent;
        let fixture: ComponentFixture<OperationMyBankAnalyticsDeleteDialogComponent>;
        let service: OperationMyBankAnalyticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [OperationMyBankAnalyticsDeleteDialogComponent],
                providers: [
                    OperationMyBankAnalyticsService
                ]
            })
            .overrideTemplate(OperationMyBankAnalyticsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperationMyBankAnalyticsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperationMyBankAnalyticsService);
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
