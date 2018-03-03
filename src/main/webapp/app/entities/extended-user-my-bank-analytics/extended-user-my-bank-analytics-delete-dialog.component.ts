import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExtendedUserMyBankAnalytics } from './extended-user-my-bank-analytics.model';
import { ExtendedUserMyBankAnalyticsPopupService } from './extended-user-my-bank-analytics-popup.service';
import { ExtendedUserMyBankAnalyticsService } from './extended-user-my-bank-analytics.service';

@Component({
    selector: 'jhi-extended-user-my-bank-analytics-delete-dialog',
    templateUrl: './extended-user-my-bank-analytics-delete-dialog.component.html'
})
export class ExtendedUserMyBankAnalyticsDeleteDialogComponent {

    extendedUser: ExtendedUserMyBankAnalytics;

    constructor(
        private extendedUserService: ExtendedUserMyBankAnalyticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.extendedUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'extendedUserListModification',
                content: 'Deleted an extendedUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-extended-user-my-bank-analytics-delete-popup',
    template: ''
})
export class ExtendedUserMyBankAnalyticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private extendedUserPopupService: ExtendedUserMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.extendedUserPopupService
                .open(ExtendedUserMyBankAnalyticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
