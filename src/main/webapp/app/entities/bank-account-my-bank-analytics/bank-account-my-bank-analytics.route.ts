import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BankAccountMyBankAnalyticsComponent } from './bank-account-my-bank-analytics.component';
import { BankAccountMyBankAnalyticsDetailComponent } from './bank-account-my-bank-analytics-detail.component';
import { BankAccountMyBankAnalyticsPopupComponent } from './bank-account-my-bank-analytics-dialog.component';
import { BankAccountMyBankAnalyticsDeletePopupComponent } from './bank-account-my-bank-analytics-delete-dialog.component';

export const bankAccountRoute: Routes = [
    {
        path: 'bank-account-my-bank-analytics',
        component: BankAccountMyBankAnalyticsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank-account-my-bank-analytics/:id',
        component: BankAccountMyBankAnalyticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankAccountPopupRoute: Routes = [
    {
        path: 'bank-account-my-bank-analytics-new',
        component: BankAccountMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-account-my-bank-analytics/:id/edit',
        component: BankAccountMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-account-my-bank-analytics/:id/delete',
        component: BankAccountMyBankAnalyticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.bankAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
