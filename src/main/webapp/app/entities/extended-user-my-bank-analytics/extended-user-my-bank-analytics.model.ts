import { BaseEntity } from './../../shared';

export class ExtendedUserMyBankAnalytics implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public firstname?: string,
        public address?: string,
        public mail?: string,
        public accounts?: BaseEntity[],
    ) {
    }
}
