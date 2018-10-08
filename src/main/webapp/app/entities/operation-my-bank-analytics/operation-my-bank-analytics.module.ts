import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyBankAnalyticsSharedModule } from '../../shared';
import {
    OperationMyBankAnalyticsService,
    OperationMyBankAnalyticsPopupService,
    OperationMyBankAnalyticsComponent,
    OperationMyBankAnalyticsDetailComponent,
    OperationMyBankAnalyticsDialogComponent,
    OperationMyBankAnalyticsPopupComponent,
    OperationMyBankAnalyticsDeletePopupComponent,
    OperationMyBankAnalyticsDeleteDialogComponent,
    operationRoute,
    operationPopupRoute,
    OperationMyBankAnalyticsResolvePagingParams,
} from './';
import { FilterPipe } from './operation-my-bank-analytics.pipe';

const ENTITY_STATES = [
    ...operationRoute,
    ...operationPopupRoute,
];

@NgModule({
    imports: [
        MyBankAnalyticsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OperationMyBankAnalyticsComponent,
        OperationMyBankAnalyticsDetailComponent,
        OperationMyBankAnalyticsDialogComponent,
        OperationMyBankAnalyticsDeleteDialogComponent,
        OperationMyBankAnalyticsPopupComponent,
        OperationMyBankAnalyticsDeletePopupComponent,
        FilterPipe
    ],
    entryComponents: [
        OperationMyBankAnalyticsComponent,
        OperationMyBankAnalyticsDialogComponent,
        OperationMyBankAnalyticsPopupComponent,
        OperationMyBankAnalyticsDeleteDialogComponent,
        OperationMyBankAnalyticsDeletePopupComponent,
    ],
    providers: [
        OperationMyBankAnalyticsService,
        OperationMyBankAnalyticsPopupService,
        OperationMyBankAnalyticsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBankAnalyticsOperationMyBankAnalyticsModule {}
