import { Moment } from 'moment';

export const compareDate = (date1: Moment, date2: Moment): boolean => (
    date1.format('DDMMYYYY') ==  date2.format('DDMMYYYY')
);
