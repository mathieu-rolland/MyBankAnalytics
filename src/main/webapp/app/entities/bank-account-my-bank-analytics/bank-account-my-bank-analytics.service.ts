import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BankAccountMyBankAnalytics } from './bank-account-my-bank-analytics.model';
import { ParserType } from './parser-type-my-bank-analytics.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BankAccountMyBankAnalyticsService {

    private resourceUrl =  SERVER_API_URL + 'api/bank-accounts';

    constructor(private http: Http) { }

    create(bankAccount: BankAccountMyBankAnalytics): Observable<BankAccountMyBankAnalytics> {
        const copy = this.convert(bankAccount);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bankAccount: BankAccountMyBankAnalytics): Observable<BankAccountMyBankAnalytics> {
        const copy = this.convert(bankAccount);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BankAccountMyBankAnalytics> {
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

    import(file: File , id: number ): Observable<Response> {

        const formData: FormData = new FormData();
        formData.append('fileKey' ,  file , file.name );
        
        return this.http.post( this.resourceUrl + '/' + id + '/import', formData ).map((res: Response) => {
            return res;
        });
    }

    getAvailableParsers(){
        return this.http.get( this.resourceUrl + '/available_parsers' ).map( (res : Response) => this.convertToParserType(res) ); 
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertToParserType( res: Response ): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServerToParserType(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    private convertItemFromServerToParserType(json: any): BankAccountMyBankAnalytics {
        const parser:ParserType = new ParserType();
        parser.name = json;
        return parser;
    }

    /**
     * Convert a returned JSON object to BankAccountMyBankAnalytics.
     */
    private convertItemFromServer(json: any): BankAccountMyBankAnalytics {
        const entity: BankAccountMyBankAnalytics = Object.assign(new BankAccountMyBankAnalytics(), json);
        return entity;
    }

    /**
     * Convert a BankAccountMyBankAnalytics to a JSON which can be sent to the server.
     */
    private convert(bankAccount: BankAccountMyBankAnalytics): BankAccountMyBankAnalytics {
        const copy: BankAccountMyBankAnalytics = Object.assign({}, bankAccount);
        return copy;
    }
}
