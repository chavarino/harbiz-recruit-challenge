const moment = require('moment')
const HourRange = require('../hour-range.class')
const RealSlot = require('../real-slot')

class Slot extends HourRange {

    emptySlots = []
    noConflicts = true;


    calculateEmptySlots(sessionSlot) {

        if (sessionSlot.getFormatedStartHour() > this.getFormatedStartHour() &&
            sessionSlot.getFormatedEndHour() < this.getFormatedEndHour()) {//session is at middle of slot
            this.emptySlots.push(
                new RealSlot(this.getStartHour(), sessionSlot.getStartHour(), this.getDateIsoFormated()),
                new RealSlot(sessionSlot.getEndHour(), this.getEndHour(), this.getDateIsoFormated())
            )
            this.noConflicts = false;
            return;
        }

        if (sessionSlot.getFormatedStartHour() === this.getFormatedStartHour() && //session is at  first part of slot
            sessionSlot.getFormatedEndHour() < this.getFormatedEndHour()) {

            this.emptySlots.push(
                new RealSlot(sessionSlot.getEndHour(), this.getEndHour(), this.getDateIsoFormated())
            )
            this.noConflicts = false;
            return;
        }


        if (sessionSlot.getFormatedStartHour() > this.getFormatedStartHour() && //session is at last part of slot
            sessionSlot.getFormatedEndHour() === this.getFormatedEndHour()) {
            this.emptySlots.push(
                new RealSlot(this.getStartHour(), sessionSlot.getStartHour(), this.getDateIsoFormated())
            )
            this.noConflicts = false;
            return;
        }


        if (sessionSlot.getFormatedStartHour() === this.getFormatedStartHour() && // session is on slot
            sessionSlot.getFormatedEndHour() === this.getFormatedEndHour()) {
            this.noConflicts = false;
            return;
        }

    }


    getRealSpots() {

        return this.noConflicts ? [new RealSlot(this.getStartHour(), this.getEndHour(), this.getDateIsoFormated())] : this.emptySlots;
    }


    

}




module.exports=Slot