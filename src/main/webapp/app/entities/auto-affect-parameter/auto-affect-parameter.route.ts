import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AutoAffectParameterComponent } from './auto-affect-parameter.component';
import { OperationMyBankAnalyticsPopupComponent } from './auto-affect-parameter-dialog.component';
import { AutoAffectParameterDetailComponent } from './auto-affect-parameter-detail.component';

@Injectable()
export class AutoAffectParametersResolvePagingParams implements Resolve<any> {

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

export const autoAffectParameterRoute: Routes = [
    {
        path: 'auto-affect-parameter',
        component: AutoAffectParameterComponent,
        /*resolve: {
            'pagingParams': AutoAffectParametersResolvePagingParams
        },*/
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'autoAffectParam.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'auto-affected-parameter/:id',
        component: AutoAffectParameterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.operation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const autoAffectParameterPopupRoute: Routes = [
    {
        path: 'auto-affect-parameter-new',
        component: OperationMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.operation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'auto-affect-parameter/:id/edit',
        component: OperationMyBankAnalyticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'myBankAnalyticsApp.operation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
