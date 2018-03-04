import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AutoAffectParam } from './auto-affect-parameter.model';
import { CategoryMyBankAnalytics, CategoryMyBankAnalyticsService } from '../category-my-bank-analytics';
import { ResponseWrapper } from '../../shared';
import { AutoAffectParameterService } from './auto-affect-parameter.service';
import { AutoAffectParameterPopupService } from './auto-affect-parameter-popup.service';

@Component({
    selector: 'jhi-operation-my-bank-analytics-dialog',
    templateUrl: './auto-affect-parameter-dialog.component.html'
})
export class AutoAffectParamDialogComponent implements OnInit {

    isSaving: boolean;

    param: AutoAffectParam;
    categories: CategoryMyBankAnalytics[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private categoryService: CategoryMyBankAnalyticsService,
        private eventManager: JhiEventManager,
        private paramService: AutoAffectParameterService
    ) {
    }

    ngOnInit() {
        this.param = new AutoAffectParam();
        this.param.target = new CategoryMyBankAnalytics();
        this.isSaving = false;
        this.categoryService.query()
            .subscribe((res: ResponseWrapper) => { this.categories = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.param.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paramService.update(this.param));
        } else {
            this.subscribeToSaveResponse(
                this.paramService.create(this.param));
        }
    }

    private subscribeToSaveResponse(result: Observable<AutoAffectParam>) {
        result.subscribe((res: AutoAffectParam) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AutoAffectParam) {
        this.eventManager.broadcast({ name: 'operationListModification', content: 'OK'});
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

    trackBankAccountById(index: number, item: AutoAffectParam) {
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
    selector: 'jhi-operation-my-bank-analytics-popup',
    template: ''
})
export class OperationMyBankAnalyticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operationPopupService: AutoAffectParameterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.operationPopupService
                    .open(AutoAffectParamDialogComponent as Component, params['id']);
            } else {
                this.operationPopupService
                    .open(AutoAffectParamDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
