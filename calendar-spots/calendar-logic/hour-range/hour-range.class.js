const moment = require('moment')


class HourRange {

    constructor(startHour, endHour, dateIsoFormated) {


        
        this.dateIsoFormated = dateIsoFormated;
        this.startHour = startHour;
        this.endHour = endHour;
 
        this.checkData()
    }

    checkData(){
        if (!this.startHour || !this.endHour || !this.dateIsoFormated) {
            throw new Error("Invalid HourRange input parameters. startHour, endHour, and dateIsoFormated are required.");
          }
    
          if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(this.startHour) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(this.endHour)) {
            throw new Error("Invalid time format. startHour and endHour must be in the format 'HH:mm'.");
          }
    
          if (!/^\d{4}-\d{2}-\d{2}$/.test(this.dateIsoFormated)) {
            throw new Error("Invalid date format. dateIsoFormated must be in the format 'YYYY-MM-DD'.");
          }
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
        return moment(this.getDateIsoFormated() + ' ' + this.getStartHour()).valueOf()
    }

    getFormatedEndHour() {

        return moment(this.getDateIsoFormated() + ' ' + this.getEndHour()).valueOf()
    }

}

module.exports=HourRange