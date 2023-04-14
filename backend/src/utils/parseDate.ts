import moment from 'moment';
/**
 * Converts the date to a ambee readable date
 * @param date In a format parsable by moment
 */
export const ambeeDateParse = (date: string): string => {
    return moment(date).format('YYYY-MM-DD hh:mm:ss');
};

export const weatherDateParse = (date: string): string => {
    return moment(date).format('MM/DD/YYYY');
}