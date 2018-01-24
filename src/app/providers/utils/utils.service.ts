import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class UtilsService {

  constructor() { }

  transformDate(timestamp, timeType, limitValue) {
    let diff = moment(new Date()).diff(timestamp, timeType);
    const types = {
      seconds: {
        nextType: 'minutes',
        limitValue: 60,
        suffix: 's',
      },
      minutes: {
        nextType: 'hours',
        limitValue: 24,
        suffix: 'm',
      },
      hours: {
        nextType: 'days',
        limitValue: 31,
        suffix: 'h',
      },
      days: {
        nextType: 'months',
        limitValue: 12,
        suffix: 'd',
      },
      months: {
        nextType: 'years',
        limitValue: 0,
        suffix: 'mo',
      },
      years: {
        nextType: null,
        limitValue: 0,
        suffix: 'y',
      },
    };

    if (diff > limitValue) {
      return this.transformDate(timestamp, types[timeType].nextType, types[timeType].limitValue);
    }

    return `${diff}${types[timeType].suffix}`;
  }
}
