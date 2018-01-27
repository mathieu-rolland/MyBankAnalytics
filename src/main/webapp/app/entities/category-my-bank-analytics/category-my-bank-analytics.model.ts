import { BaseEntity } from './../../shared';

export class CategoryMyBankAnalytics implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public parents?: BaseEntity[],
        public operations?: BaseEntity[],
        public categories?: BaseEntity[],
    ) {
    }
}
