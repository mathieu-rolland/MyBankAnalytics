import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoryMyBankAnalytics } from './category-my-bank-analytics.model';
import { CategoryMyBankAnalyticsPopupService } from './category-my-bank-analytics-popup.service';
import { CategoryMyBankAnalyticsService } from './category-my-bank-analytics.service';

@Component({
    selector: 'jhi-category-my-bank-analytics-delete-dialog',
    templateUrl: './category-my-bank-analytics-delete-dialog.component.html'
})
export class CategoryMyBankAnalyticsDeleteDialogComponent {

    category: CategoryMyBankAnalytics;

    constructor(
        private categoryService: CategoryMyBankAnalyticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoryListModification',
                content: 'Deleted an category'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-category-my-bank-analytics-delete-popup',
    template: ''
})
export class CategoryMyBankAnalyticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoryPopupService
                .open(CategoryMyBankAnalyticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
