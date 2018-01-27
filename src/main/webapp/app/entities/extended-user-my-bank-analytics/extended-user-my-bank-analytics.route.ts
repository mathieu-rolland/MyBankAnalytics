import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExtendedUserMyBankAnalyticsComponent } from './extended-user-my-bank-analytics.component';
import { ExtendedUserMyBankAnalyticsDetailComponent } from './extended-user-my-bank-analytics-detail.component';
import { ExtendedUserMyBankAnalyticsPopupComponent } from './extended-user-my-bank-analytics-dialog.component';
import {
    ExtendedUserMyBankAnalyticsDeletePopupComponent
} from './extended-user-my-bank-analytics-delete-dialog.component';

export const extendedUserRoute: Routes = [
    {
        path: 'extended-user-my-bank-analytics',
        component: ExtendedUserMyBankAnalyticsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'extended-user-my-bank-analytics/:id',
        component: ExtendedUserMyBankAnalyticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const extendedUserPopupRoute: Routes = [
    {
        path: 'extended-user-my-bank-analytics-new',
        component: ExtendedUserMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extended-user-my-bank-analytics/:id/edit',
        component: ExtendedUserMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'extended-user-my-bank-analytics/:id/delete',
        component: ExtendedUserMyBankAnalyticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.extendedUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
