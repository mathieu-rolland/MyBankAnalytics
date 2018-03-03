import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyBankAnalyticsSharedModule } from '../../shared';
import {
    ExtendedUserMyBankAnalyticsService,
    ExtendedUserMyBankAnalyticsPopupService,
    ExtendedUserMyBankAnalyticsComponent,
    ExtendedUserMyBankAnalyticsDetailComponent,
    ExtendedUserMyBankAnalyticsDialogComponent,
    ExtendedUserMyBankAnalyticsPopupComponent,
    ExtendedUserMyBankAnalyticsDeletePopupComponent,
    ExtendedUserMyBankAnalyticsDeleteDialogComponent,
    extendedUserRoute,
    extendedUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...extendedUserRoute,
    ...extendedUserPopupRoute,
];

@NgModule({
    imports: [
        MyBankAnalyticsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExtendedUserMyBankAnalyticsComponent,
        ExtendedUserMyBankAnalyticsDetailComponent,
        ExtendedUserMyBankAnalyticsDialogComponent,
        ExtendedUserMyBankAnalyticsDeleteDialogComponent,
        ExtendedUserMyBankAnalyticsPopupComponent,
        ExtendedUserMyBankAnalyticsDeletePopupComponent,
    ],
    entryComponents: [
        ExtendedUserMyBankAnalyticsComponent,
        ExtendedUserMyBankAnalyticsDialogComponent,
        ExtendedUserMyBankAnalyticsPopupComponent,
        ExtendedUserMyBankAnalyticsDeleteDialogComponent,
        ExtendedUserMyBankAnalyticsDeletePopupComponent,
    ],
    providers: [
        ExtendedUserMyBankAnalyticsService,
        ExtendedUserMyBankAnalyticsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBankAnalyticsExtendedUserMyBankAnalyticsModule {}
