import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { CategoryMyBankAnalytics } from '../category-my-bank-analytics';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AutoAffectParam } from './auto-affect-parameter.model';
import { ResponseWrapper, createRequestOption, DateUtils } from '../../shared';

@Injectable()
export class AutoAffectParameterService {

	private resourceUrl =  SERVER_API_URL + 'api/autoaffectparameter';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    findAll():  Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl + "/all")
            .map((res: Response) => this.convertResponse(res));
    }

    create( param: AutoAffectParam ): Observable<AutoAffectParam>{
    	const copy = this.convert(param);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update( param: AutoAffectParam ): Observable<AutoAffectParam>{
    	const copy = this.convert(param);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });	
    }

    delete(id: number):Observable<Response>  {
    	return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    find( id: number ): Observable<AutoAffectParam>{
    	return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    applyParameter():Observable<Response>{
        return this.http.get( this.resourceUrl + "/apply" );
    }

	private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            console.log(jsonResponse[i]);
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to AutoAffectParam.
     */
    private convertItemFromServer(json: any): AutoAffectParam {
        console.log(json);
        const entity: AutoAffectParam = new AutoAffectParam();
        entity.id = json.id;
        entity.regex = json.regex;
        entity.target = new CategoryMyBankAnalytics();
        entity.target.id = json.target.id;
        entity.target.label = json.target.label;
        
        console.log(entity);
        return entity;
    }

    /**
     * Convert a AutoAffectParam to a JSON which can be sent to the server.
     */
    private convert(param: AutoAffectParam): AutoAffectParam {
        const copy: AutoAffectParam = Object.assign({}, param);
        return copy;
    }

}
