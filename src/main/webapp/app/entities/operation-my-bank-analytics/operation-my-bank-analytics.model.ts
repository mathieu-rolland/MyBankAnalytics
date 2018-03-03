import { BaseEntity } from './../../shared';

export class OperationMyBankAnalytics implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public date?: any,
        public categories?: BaseEntity[],
        public accountId?: number,
        public label?: string,
        public details?: string,
    ) {
    }
}
