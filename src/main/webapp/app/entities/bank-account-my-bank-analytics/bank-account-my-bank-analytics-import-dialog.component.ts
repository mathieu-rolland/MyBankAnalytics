import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankAccountMyBankAnalytics } from './bank-account-my-bank-analytics.model';
import { BankAccountMyBankAnalyticsPopupService } from './bank-account-my-bank-analytics-popup.service';
import { BankAccountMyBankAnalyticsService } from './bank-account-my-bank-analytics.service';

@Component({
    selector: 'jhi-bank-account-my-bank-analytics-import-dialog',
    templateUrl: './bank-account-my-bank-analytics-import-dialog.component.html'
})
export class BankAccountMyBankAnalyticsImportDialogComponent {

	bankAccount : BankAccountMyBankAnalytics;
    fileToUpload: File = null;

	constructor(
		private bankAccountService: BankAccountMyBankAnalyticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager) {}

 	clear() {
        this.activeModal.dismiss('cancel');
    }

    handleFileInput( files: FileList ){
        this.fileToUpload = files.item(0);
    }

	confirmImport( id: number ){
		console.log('Confirme import clicked for ' + this.fileToUpload.name );
        this.bankAccountService.import( this.fileToUpload , id ).subscribe( (res) => {
            console.log(res);
        } );
	}
}


@Component({
	selector: 'jhi-bank-account-my-bank-analytics-import-popup',
	template : ''
})
export class BankAccountMyBankAnalyticsImportPopupComponent implements OnInit, OnDestroy{

	routeSub: any;

	constructor(
		private route: ActivatedRoute,
        private bankAccountPopupService: BankAccountMyBankAnalyticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankAccountPopupService
                .open(BankAccountMyBankAnalyticsImportDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}