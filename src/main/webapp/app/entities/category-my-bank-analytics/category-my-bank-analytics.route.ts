import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategoryMyBankAnalyticsComponent } from './category-my-bank-analytics.component';
import { CategoryMyBankAnalyticsDetailComponent } from './category-my-bank-analytics-detail.component';
import { CategoryMyBankAnalyticsPopupComponent } from './category-my-bank-analytics-dialog.component';
import { CategoryMyBankAnalyticsDeletePopupComponent } from './category-my-bank-analytics-delete-dialog.component';

export const categoryRoute: Routes = [
    {
        path: 'category-my-bank-analytics',
        component: CategoryMyBankAnalyticsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-my-bank-analytics/:id',
        component: CategoryMyBankAnalyticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-my-bank-analytics-new',
        component: CategoryMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-my-bank-analytics/:id/edit',
        component: CategoryMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-my-bank-analytics/:id/delete',
        component: CategoryMyBankAnalyticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
