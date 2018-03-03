import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ExtendedUserMyBankAnalytics } from './extended-user-my-bank-analytics.model';
import { ExtendedUserMyBankAnalyticsService } from './extended-user-my-bank-analytics.service';

@Injectable()
export class ExtendedUserMyBankAnalyticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private extendedUserService: ExtendedUserMyBankAnalyticsService

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
                this.extendedUserService.find(id).subscribe((extendedUser) => {
                    this.ngbModalRef = this.extendedUserModalRef(component, extendedUser);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.extendedUserModalRef(component, new ExtendedUserMyBankAnalytics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    extendedUserModalRef(component: Component, extendedUser: ExtendedUserMyBankAnalytics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.extendedUser = extendedUser;
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
