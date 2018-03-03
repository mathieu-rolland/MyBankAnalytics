import { BaseEntity } from './../../shared';

export class BankAccountMyBankAnalytics implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public accountBalance?: number,
        public operations?: BaseEntity[],
        public ownerId?: number,
    ) {
    }
}
