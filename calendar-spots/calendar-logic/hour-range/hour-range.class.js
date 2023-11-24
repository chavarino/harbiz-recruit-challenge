const moment = require('moment')


class HourRange {

    constructor(startHour, endHour, dateIsoFormated) {

        this.dateIsoFormated = dateIsoFormated;
        this.startHour = startHour;
        this.endHour = endHour;
        this.formatedStartHour = moment(this.dateIsoFormated + ' ' + this.startHour).valueOf()
        this.formatedEndHour = moment(this.dateIsoFormated + ' ' + this.endHour).valueOf()

    }

    getDateIsoFormated() {
        return this.dateIsoFormated
    }

    getStartHour() {
        return this.startHour;
    }

    getEndHour() {
        return this.endHour;
    }


    getFormatedStartHour() {
        return this.formatedStartHour
    }

    getFormatedEndHour() {

        return this.formatedEndHour
    }

}

module.exports=HourRange