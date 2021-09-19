import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MixinService {

    constructor() { }

    getMySqlDate(date: Date): string {
        const newDate: Date = date;
        const DD: number = newDate.getDate();
        const MM: number = newDate.getMonth() + 1;
        const YYYY: number = newDate.getUTCFullYear();

        return `${YYYY}-${MM}-${DD}`;
    }
}
