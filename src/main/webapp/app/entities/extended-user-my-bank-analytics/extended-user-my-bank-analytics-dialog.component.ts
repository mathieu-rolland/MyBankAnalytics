import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExtendedUserMyBankAnalytics } from './extended-user-my-bank-analytics.model';
import { ExtendedUserMyBankAnalyticsPopupService } from './extended-user-my-bank-analytics-popup.service';
import { ExtendedUserMyBankAnalyticsService } from './extended-user-my-bank-analytics.service';

@Component({
    selector: 'jhi-extended-user-my-bank-analytics-dialog',
    templateUrl: './extended-user-my-bank-analytics-dialog.component.html'
})
export class ExtendedUserMyBankAnalyticsDialogComponent implements OnInit {

    extendedUser: ExtendedUserMyBankAnalytics;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private extendedUserService: ExtendedUserMyBankAnalyticsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.extendedUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.extendedUserService.update(this.extendedUser));
        } else {
            this.subscribeToSaveResponse(
                this.extendedUserService.create(this.extendedUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<ExtendedUserMyBankAnalytics>) {
        result.subscribe((res: ExtendedUserMyBankAnalytics) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ExtendedUserMyBankAnalytics) {
        this.eventManager.broadcast({ name: 'extendedUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-extended-user-my-bank-analytics-popup',
    template: ''
})
export class ExtendedUserMyBankAnalyticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extendedUserPopupService: ExtendedUserMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.extendedUserPopupService
                    .open(ExtendedUserMyBankAnalyticsDialogComponent as Component, params['id']);
            } else {
                this.extendedUserPopupService
                    .open(ExtendedUserMyBankAnalyticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
