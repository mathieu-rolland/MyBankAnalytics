import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ExtendedUserMyBankAnalytics } from './extended-user-my-bank-analytics.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ExtendedUserMyBankAnalyticsService {

    private resourceUrl =  SERVER_API_URL + 'api/extended-users';

    constructor(private http: Http) { }

    create(extendedUser: ExtendedUserMyBankAnalytics): Observable<ExtendedUserMyBankAnalytics> {
        const copy = this.convert(extendedUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(extendedUser: ExtendedUserMyBankAnalytics): Observable<ExtendedUserMyBankAnalytics> {
        const copy = this.convert(extendedUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ExtendedUserMyBankAnalytics> {
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
     * Convert a returned JSON object to ExtendedUserMyBankAnalytics.
     */
    private convertItemFromServer(json: any): ExtendedUserMyBankAnalytics {
        const entity: ExtendedUserMyBankAnalytics = Object.assign(new ExtendedUserMyBankAnalytics(), json);
        return entity;
    }

    /**
     * Convert a ExtendedUserMyBankAnalytics to a JSON which can be sent to the server.
     */
    private convert(extendedUser: ExtendedUserMyBankAnalytics): ExtendedUserMyBankAnalytics {
        const copy: ExtendedUserMyBankAnalytics = Object.assign({}, extendedUser);
        return copy;
    }
}
