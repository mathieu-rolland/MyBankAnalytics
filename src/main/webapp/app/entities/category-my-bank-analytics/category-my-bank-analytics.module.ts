import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyBankAnalyticsSharedModule } from '../../shared';
import {
    CategoryMyBankAnalyticsService,
    CategoryMyBankAnalyticsPopupService,
    CategoryMyBankAnalyticsComponent,
    CategoryMyBankAnalyticsDetailComponent,
    CategoryMyBankAnalyticsDialogComponent,
    CategoryMyBankAnalyticsPopupComponent,
    CategoryMyBankAnalyticsDeletePopupComponent,
    CategoryMyBankAnalyticsDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoryRoute,
    ...categoryPopupRoute,
];

@NgModule({
    imports: [
        MyBankAnalyticsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CategoryMyBankAnalyticsComponent,
        CategoryMyBankAnalyticsDetailComponent,
        CategoryMyBankAnalyticsDialogComponent,
        CategoryMyBankAnalyticsDeleteDialogComponent,
        CategoryMyBankAnalyticsPopupComponent,
        CategoryMyBankAnalyticsDeletePopupComponent,
    ],
    entryComponents: [
        CategoryMyBankAnalyticsComponent,
        CategoryMyBankAnalyticsDialogComponent,
        CategoryMyBankAnalyticsPopupComponent,
        CategoryMyBankAnalyticsDeleteDialogComponent,
        CategoryMyBankAnalyticsDeletePopupComponent,
    ],
    providers: [
        CategoryMyBankAnalyticsService,
        CategoryMyBankAnalyticsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBankAnalyticsCategoryMyBankAnalyticsModule {}
