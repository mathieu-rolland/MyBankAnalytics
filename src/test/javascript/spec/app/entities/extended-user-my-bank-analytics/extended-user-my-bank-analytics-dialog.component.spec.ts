/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { MyBankAnalyticsTestModule } from '../../../test.module';
import { ExtendedUserMyBankAnalyticsDialogComponent } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics-dialog.component';
import { ExtendedUserMyBankAnalyticsService } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics.service';
import { ExtendedUserMyBankAnalytics } from '../../../../../../main/webapp/app/entities/extended-user-my-bank-analytics/extended-user-my-bank-analytics.model';

describe('Component Tests', () => {

    describe('ExtendedUserMyBankAnalytics Management Dialog Component', () => {
        let comp: ExtendedUserMyBankAnalyticsDialogComponent;
        let fixture: ComponentFixture<ExtendedUserMyBankAnalyticsDialogComponent>;
        let service: ExtendedUserMyBankAnalyticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyBankAnalyticsTestModule],
                declarations: [ExtendedUserMyBankAnalyticsDialogComponent],
                providers: [
                    ExtendedUserMyBankAnalyticsService
                ]
            })
            .overrideTemplate(ExtendedUserMyBankAnalyticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExtendedUserMyBankAnalyticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExtendedUserMyBankAnalyticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExtendedUserMyBankAnalytics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.extendedUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'extendedUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExtendedUserMyBankAnalytics();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.extendedUser = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'extendedUserListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
