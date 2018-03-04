import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyBankAnalyticsBankAccountMyBankAnalyticsModule } from './bank-account-my-bank-analytics/bank-account-my-bank-analytics.module';
import { MyBankAnalyticsOperationMyBankAnalyticsModule } from './operation-my-bank-analytics/operation-my-bank-analytics.module';
import { MyBankAnalyticsCategoryMyBankAnalyticsModule } from './category-my-bank-analytics/category-my-bank-analytics.module';
import { MyBankAnalyticsExtendedUserMyBankAnalyticsModule } from './extended-user-my-bank-analytics/extended-user-my-bank-analytics.module';
import { AutoAffectParameterModule } from './auto-affect-parameter/auto-affect-parameter.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyBankAnalyticsBankAccountMyBankAnalyticsModule,
        MyBankAnalyticsOperationMyBankAnalyticsModule,
        MyBankAnalyticsCategoryMyBankAnalyticsModule,
        MyBankAnalyticsExtendedUserMyBankAnalyticsModule,
        AutoAffectParameterModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBankAnalyticsEntityModule {}
