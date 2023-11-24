const moment = require('moment')
const HourRange = require('../hour-range.class')

class RealSlot extends HourRange {




    getEmptySlotsByDuration(durationBefore, duration, durationAfter) {


        const startHourFirst = this.getMomentHour(this.getStartHour());

        const endHour = this.addMinutes(startHourFirst, durationBefore + duration + durationAfter);
        const clientStartHour = this.addMinutes(startHourFirst, durationBefore);
        const clientEndHour = this.addMinutes(startHourFirst, duration);

        if (moment.utc(endHour, 'HH:mm').valueOf() > moment.utc(this.getEndHour(), 'HH:mm').valueOf()) {
            return [];
        }
        const durationSlot = {
            startHour: moment.utc(this.getDateIsoFormated() + ' ' + this.getStartHour())
                .toDate(),
            endHour: moment.utc(this.getDateIsoFormated() + ' ' + endHour)
                .toDate(),
            clientStartHour: moment.utc(this.getDateIsoFormated() + ' ' + clientStartHour)
                .toDate(),
            clientEndHour: moment.utc(this.getDateIsoFormated() + ' ' + clientEndHour)
                .toDate(),
        };
        const restSlot = new RealSlot(endHour, this.getEndHour(), this.getDateIsoFormated())

        return [durationSlot, ...restSlot.getEmptySlotsByDuration(durationBefore, duration, durationAfter)];


    }

    getMomentHour = (hour) => {
        const finalHourForAdd = moment(this.getDateIsoFormated() + ' ' + hour);
        return finalHourForAdd;
    }
    addMinutes = (hour, minutes) => {
        const result = moment(hour).add(minutes, 'minutes').format('HH:mm');
        return result;
    }
    removeMinutes = (hour, minutes) => {
        const result = moment(hour).subtract(minutes, 'minutes').format('HH:mm');
        return result;
    }
}




module.exports = RealSlot