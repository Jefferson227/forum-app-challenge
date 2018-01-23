import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class UtilsService {

  constructor() { }

  transformDate(timestamp) {
    let diff = moment(new Date()).diff(timestamp, 'seconds');
    let value = '';

    if (diff > 60) {
      diff = moment(new Date()).diff(timestamp, 'minutes');

      if (diff > 60) {
        diff = moment(new Date()).diff(timestamp, 'hours');

        if (diff > 24) {
          diff = moment(new Date()).diff(timestamp, 'days');

          if (diff > 31) {
            diff = moment(new Date()).diff(timestamp, 'months');

            if (diff > 12) {
              diff = moment(new Date()).diff(timestamp, 'years');
              value = diff + 'y';
            } else {
              value = diff + 'mo';
            }
          } else {
            value = diff + 'd';
          }
        } else {
          value = diff + 'h';
        }
      } else {
        value = diff + 'm';
      }
    } else {
      value = diff + 's';
    }

    return value;
  }
}
