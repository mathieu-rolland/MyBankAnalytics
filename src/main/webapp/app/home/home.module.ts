import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyBankAnalyticsSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { ChartModule } from 'angular-highcharts';

@NgModule({
    imports: [
        MyBankAnalyticsSharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        ChartModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyBankAnalyticsHomeModule {}
