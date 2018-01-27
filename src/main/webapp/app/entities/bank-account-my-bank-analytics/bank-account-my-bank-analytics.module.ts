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
    ],
    entryComponents: [
        BankAccountMyBankAnalyticsComponent,
        BankAccountMyBankAnalyticsDialogComponent,
        BankAccountMyBankAnalyticsPopupComponent,
        BankAccountMyBankAnalyticsDeleteDialogComponent,
        BankAccountMyBankAnalyticsDeletePopupComponent,
    ],
    providers: [
        BankAccountMyBankAnalyticsService,
        BankAccountMyBankAnalyticsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBankAnalyticsBankAccountMyBankAnalyticsModule {}
