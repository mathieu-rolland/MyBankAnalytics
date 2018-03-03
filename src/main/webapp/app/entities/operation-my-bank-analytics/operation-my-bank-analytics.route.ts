import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OperationMyBankAnalyticsComponent } from './operation-my-bank-analytics.component';
import { OperationMyBankAnalyticsDetailComponent } from './operation-my-bank-analytics-detail.component';
import { OperationMyBankAnalyticsPopupComponent } from './operation-my-bank-analytics-dialog.component';
import { OperationMyBankAnalyticsDeletePopupComponent } from './operation-my-bank-analytics-delete-dialog.component';

@Injectable()
export class OperationMyBankAnalyticsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const operationRoute: Routes = [
    {
        path: 'operation-my-bank-analytics',
        component: OperationMyBankAnalyticsComponent,
        resolve: {
            'pagingParams': OperationMyBankAnalyticsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.operation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'operation-my-bank-analytics/:id',
        component: OperationMyBankAnalyticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.operation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const operationPopupRoute: Routes = [
    {
        path: 'operation-my-bank-analytics-new',
        component: OperationMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.operation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operation-my-bank-analytics/:id/edit',
        component: OperationMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.operation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operation-my-bank-analytics/:id/delete',
        component: OperationMyBankAnalyticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.operation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
