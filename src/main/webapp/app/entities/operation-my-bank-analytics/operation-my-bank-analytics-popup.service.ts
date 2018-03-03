import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OperationMyBankAnalytics } from './operation-my-bank-analytics.model';
import { OperationMyBankAnalyticsService } from './operation-my-bank-analytics.service';

@Injectable()
export class OperationMyBankAnalyticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private operationService: OperationMyBankAnalyticsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.operationService.find(id).subscribe((operation) => {
                    if (operation.date) {
                        operation.date = {
                            year: operation.date.getFullYear(),
                            month: operation.date.getMonth() + 1,
                            day: operation.date.getDate()
                        };
                    }
                    this.ngbModalRef = this.operationModalRef(component, operation);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.operationModalRef(component, new OperationMyBankAnalytics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    operationModalRef(component: Component, operation: OperationMyBankAnalytics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.operation = operation;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
