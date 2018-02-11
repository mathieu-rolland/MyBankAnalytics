import { DatePipe } from '@angular/common';

export class DateUtils {

    constructor() {}

    static formatDate( pattern: string , date: Date) {
        const datePipe = new DatePipe('fr-FR');
        return datePipe.transform( date, 'dd/MM/yyyy');
    }

    static firstDayOftTheMonth( date: Date ) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    static lastDayOfTheMonth( date: Date ) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

}
