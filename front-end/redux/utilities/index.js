import { DateTime, Interval } from "luxon"


export function checkTimeOverlaps(start, end, comparedStart, comparedEnd) {
    let interval = Interval.fromDateTimes(DateTime.fromFormat(start, 'HH:mm'), DateTime.fromFormat(end, 'HH:mm'));
    let comparedInterval = Interval.fromDateTimes(DateTime.fromFormat(comparedStart, 'HH:mm'), DateTime.fromFormat(comparedEnd, 'HH:mm'))
    return interval.overlaps(comparedInterval);
}
