import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'days'
})
export class DayPipe implements PipeTransform {
    transform(value: any) {
        value = Date.parse(value);
        let totalTime = new Date().getTime();
        totalTime = totalTime - value;

        let hours = Math.floor(totalTime / (60 * 60 * 1000));
        let days = Math.floor(totalTime / (24 * 60 * 60 * 1000));
        let months = Math.floor(days / 30);
        let year = Math.floor(months / 12);

        if (year > 0) {
            let yearS = year.toString();
            return yearS + "yrs ago.";
        }
        if (months > 0) {
            let monthsS = months.toString();
            return monthsS + "mth ago";
        }
        if (days > 0) {
            let daysS = days.toString();
            return daysS + "dys ago";
        }
        let hoursS = hours.toString();
        return hoursS + "hrs ago";
    }

}