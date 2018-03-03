/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { BankAccountMyBankAnalyticsDialogComponent } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics-dialog.component';
import { BankAccountMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics.service';
import { BankAccountMyBankAnalytics } from '../../../../../../main/webapp/app/entities/bank-account-my-bank-analytics/bank-account-my-bank-analytics.model';
import { ExtendedUserMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics';

describe('Component Tests', () => {

    describe('BankAccountMyBankAnalytics Management Dialog Component', () => {
        let comp: BankAccountMyBankAnalyticsDialogComponent;
        let fixture: ComponentFixture<BankAccountMyBankAnalyticsDialogComponent>;
        let service: BankAccountMyBankAnalyticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [BankAccountMyBankAnalyticsDialogComponent],
                providers: [
                    ExtendedUserMyBankAnalyticsService,
                    BankAccountMyBankAnalyticsService
                ]
            })
            .overrideTemplate(BankAccountMyBankAnalyticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankAccountMyBankAnalyticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountMyBankAnalyticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BankAccountMyBankAnalytics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bankAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bankAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BankAccountMyBankAnalytics();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bankAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bankAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
