import { CategoryMyBankAnalytics } from '../category-my-bank-analytics';
import { BaseEntity } from './../../shared';

export class AutoAffectParam implements BaseEntity {
    constructor(
        public id?: number,
        public regex?: string,
        public target?: CategoryMyBankAnalytics,
    ) {
    }
}
