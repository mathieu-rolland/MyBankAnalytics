import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MyBankAnalyticsSharedModule } from '../../shared';

import {
    AutoAffectParameterService,
    AutoAffectParameterComponent,
    AutoAffectParam,
    autoAffectParameterRoute,
    autoAffectParameterPopupRoute,
    AutoAffectParameterPopupService,
    AutoAffectParamDialogComponent,
    OperationMyBankAnalyticsPopupComponent,
    AutoAffectParameterDetailComponent,
} from './';

const ENTITY_STATES = [
    ...autoAffectParameterRoute,
    ...autoAffectParameterPopupRoute,
];

@NgModule({
    imports: [
       RouterModule.forChild(ENTITY_STATES),
       CommonModule,
       BrowserModule,
       MyBankAnalyticsSharedModule
    ],
    declarations: [
      AutoAffectParamDialogComponent,
      OperationMyBankAnalyticsPopupComponent,
      AutoAffectParameterComponent,
      AutoAffectParameterDetailComponent
    ],
    entryComponents: [
        AutoAffectParameterComponent,
        AutoAffectParamDialogComponent,
        OperationMyBankAnalyticsPopupComponent,
        AutoAffectParameterDetailComponent
    ],
    providers: [
        AutoAffectParameterService,
        AutoAffectParameterPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AutoAffectParameterModule {}
