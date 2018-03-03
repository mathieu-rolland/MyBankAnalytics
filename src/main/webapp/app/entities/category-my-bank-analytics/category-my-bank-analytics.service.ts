import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CategoryMyBankAnalytics } from './category-my-bank-analytics.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CategoryMyBankAnalyticsService {

    private resourceUrl =  SERVER_API_URL + 'api/categories';

    constructor(private http: Http) { }

    create(category: CategoryMyBankAnalytics): Observable<CategoryMyBankAnalytics> {
        const copy = this.convert(category);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(category: CategoryMyBankAnalytics): Observable<CategoryMyBankAnalytics> {
        const copy = this.convert(category);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CategoryMyBankAnalytics> {
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
     * Convert a returned JSON object to CategoryMyBankAnalytics.
     */
    private convertItemFromServer(json: any): CategoryMyBankAnalytics {
        const entity: CategoryMyBankAnalytics = Object.assign(new CategoryMyBankAnalytics(), json);
        return entity;
    }

    /**
     * Convert a CategoryMyBankAnalytics to a JSON which can be sent to the server.
     */
    private convert(category: CategoryMyBankAnalytics): CategoryMyBankAnalytics {
        const copy: CategoryMyBankAnalytics = Object.assign({}, category);
        return copy;
    }
}
