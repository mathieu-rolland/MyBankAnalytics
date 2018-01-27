/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { BankAccountMyBankAnalyticsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics-delete-dialog.component';
import { BankAccountMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics.service';

describe('Component Tests', () => {

    describe('BankAccountMyBankAnalytics Management Delete Component', () => {
        let comp: BankAccountMyBankAnalyticsDeleteDialogComponent;
        let fixture: ComponentFixture<BankAccountMyBankAnalyticsDeleteDialogComponent>;
        let service: BankAccountMyBankAnalyticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [BankAccountMyBankAnalyticsDeleteDialogComponent],
                providers: [
                    BankAccountMyBankAnalyticsService
                ]
            })
            .overrideTemplate(BankAccountMyBankAnalyticsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankAccountMyBankAnalyticsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountMyBankAnalyticsService);
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
