import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CategoryMyBankAnalytics } from './category-my-bank-analytics.model';
import { CategoryMyBankAnalyticsPopupService } from './category-my-bank-analytics-popup.service';
import { CategoryMyBankAnalyticsService } from './category-my-bank-analytics.service';
import { OperationMyBankAnalytics, OperationMyBankAnalyticsService } from '../operation-my-bank-analytics';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-category-my-bank-analytics-dialog',
    templateUrl: './category-my-bank-analytics-dialog.component.html'
})
export class CategoryMyBankAnalyticsDialogComponent implements OnInit {

    category: CategoryMyBankAnalytics;
    isSaving: boolean;

    categories: CategoryMyBankAnalytics[];

    operations: OperationMyBankAnalytics[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private categoryService: CategoryMyBankAnalyticsService,
        private operationService: OperationMyBankAnalyticsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.operationService.query()
            .subscribe((res: ResponseWrapper) => { this.operations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoryService.update(this.category));
        } else {
            this.subscribeToSaveResponse(
                this.categoryService.create(this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<CategoryMyBankAnalytics>) {
        result.subscribe((res: CategoryMyBankAnalytics) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CategoryMyBankAnalytics) {
        this.eventManager.broadcast({ name: 'categoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCategoryById(index: number, item: CategoryMyBankAnalytics) {
        return item.id;
    }

    trackOperationById(index: number, item: OperationMyBankAnalytics) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-category-my-bank-analytics-popup',
    template: ''
})
export class CategoryMyBankAnalyticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoryPopupService
                    .open(CategoryMyBankAnalyticsDialogComponent as Component, params['id']);
            } else {
                this.categoryPopupService
                    .open(CategoryMyBankAnalyticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
