import { BaseEntity } from './../../shared';
import { ParserType } from './parser-type-my-bank-analytics.model';

export class BankAccountMyBankAnalytics implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public accountBalance?: number,
        public operations?: BaseEntity[],
        public ownerId?: number,
        public parserType?:ParserType,
    ) {
    }
}
