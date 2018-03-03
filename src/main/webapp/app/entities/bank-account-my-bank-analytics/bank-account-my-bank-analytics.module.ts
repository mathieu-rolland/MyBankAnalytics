import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyBankAnalyticsSharedModule } from '../../shared';
import {
    BankAccountMyBankAnalyticsService,
    BankAccountMyBankAnalyticsPopupService,
    BankAccountMyBankAnalyticsComponent,
    BankAccountMyBankAnalyticsDetailComponent,
    BankAccountMyBankAnalyticsDialogComponent,
    BankAccountMyBankAnalyticsPopupComponent,
    BankAccountMyBankAnalyticsDeletePopupComponent,
    BankAccountMyBankAnalyticsDeleteDialogComponent,
    BankAccountMyBankAnalyticsImportPopupComponent,
    BankAccountMyBankAnalyticsImportDialogComponent,
    bankAccountRoute,
    bankAccountPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bankAccountRoute,
    ...bankAccountPopupRoute,
];

@NgModule({
    imports: [
        MyBankAnalyticsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BankAccountMyBankAnalyticsComponent,
        BankAccountMyBankAnalyticsDetailComponent,
        BankAccountMyBankAnalyticsDialogComponent,
        BankAccountMyBankAnalyticsDeleteDialogComponent,
        BankAccountMyBankAnalyticsPopupComponent,
        BankAccountMyBankAnalyticsDeletePopupComponent,
        BankAccountMyBankAnalyticsImportPopupComponent,
        BankAccountMyBankAnalyticsImportDialogComponent,
    ],
    entryComponents: [
        BankAccountMyBankAnalyticsComponent,
        BankAccountMyBankAnalyticsDialogComponent,
        BankAccountMyBankAnalyticsPopupComponent,
        BankAccountMyBankAnalyticsDeleteDialogComponent,
        BankAccountMyBankAnalyticsDeletePopupComponent,
        BankAccountMyBankAnalyticsImportPopupComponent,
        BankAccountMyBankAnalyticsImportDialogComponent,
    ],
    providers: [
        BankAccountMyBankAnalyticsService,
        BankAccountMyBankAnalyticsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBankAnalyticsBankAccountMyBankAnalyticsModule {}
