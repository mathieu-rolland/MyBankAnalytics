import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OperationMyBankAnalytics } from './operation-my-bank-analytics.model';
import { OperationMyBankAnalyticsPopupService } from './operation-my-bank-analytics-popup.service';
import { OperationMyBankAnalyticsService } from './operation-my-bank-analytics.service';

@Component({
    selector: 'jhi-operation-my-bank-analytics-delete-dialog',
    templateUrl: './operation-my-bank-analytics-delete-dialog.component.html'
})
export class OperationMyBankAnalyticsDeleteDialogComponent {

    operation: OperationMyBankAnalytics;

    constructor(
        private operationService: OperationMyBankAnalyticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.operationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'operationListModification',
                content: 'Deleted an operation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-operation-my-bank-analytics-delete-popup',
    template: ''
})
export class OperationMyBankAnalyticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operationPopupService: OperationMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.operationPopupService
                .open(OperationMyBankAnalyticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
