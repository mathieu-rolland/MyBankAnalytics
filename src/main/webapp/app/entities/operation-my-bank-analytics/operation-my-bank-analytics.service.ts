import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OperationMyBankAnalytics } from './operation-my-bank-analytics.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OperationMyBankAnalyticsService {

    private resourceUrl =  SERVER_API_URL + 'api/operations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(operation: OperationMyBankAnalytics): Observable<OperationMyBankAnalytics> {
        const copy = this.convert(operation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(operation: OperationMyBankAnalytics): Observable<OperationMyBankAnalytics> {
        const copy = this.convert(operation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OperationMyBankAnalytics> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to OperationMyBankAnalytics.
     */
    private convertItemFromServer(json: any): OperationMyBankAnalytics {
        const entity: OperationMyBankAnalytics = Object.assign(new OperationMyBankAnalytics(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a OperationMyBankAnalytics to a JSON which can be sent to the server.
     */
    private convert(operation: OperationMyBankAnalytics): OperationMyBankAnalytics {
        const copy: OperationMyBankAnalytics = Object.assign({}, operation);
        copy.date = this.dateUtils
            .convertLocalDateToServer(operation.date);
        return copy;
    }
}
