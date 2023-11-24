const moment = require('moment')
const { Session, Slot, RealSlot } = require('./hour-range')

class CalendarLogic {



  constructor(calendarId, dateKey, calendarReader) {
    this.calendarId = calendarId;
    this.dateKey = dateKey;

    this.calendarData = calendarReader.read(this.calendarId)
    this.durationBefore = this.calendarData.durationBefore;
    this.durationAfter = this.calendarData.durationAfter;
    this.dateISO = moment(dateKey, 'DD-MM-YYYY').format('YYYY-MM-DD')
    this.daySlots = []
    this.realSpots = []

  }

  filterDaySlots() {

    const daySlotsIn = this.calendarData.slots[this.dateKey];

    this.daySlots = Array.isArray(daySlotsIn) ? daySlotsIn.map(slot => new Slot(slot.start, slot.end, this.dateISO)) : []


  }


  filterEmptySpots() {
    const realSpots = []
    const sessionOnDay = this.calendarData.sessions[this.dateKey];

    this.daySlots.forEach(daySlot => {

      if (!this.calendarData.sessions || !sessionOnDay) {
        realSpots.push(new RealSlot(daySlot.getStartHour(), daySlot.getEndHour(), daySlot.getDateIsoFormated()))
        return;
      }

      sessionOnDay.forEach(rawSessionSlot => {


        const sesionSlot = new Session(rawSessionSlot.start, rawSessionSlot.end, this.dateISO)

        daySlot.calculateEmptySlots(sesionSlot)

      })
      realSpots.push(...daySlot.getRealSpots())
    })
    this.realSpots = realSpots;
  }

  getAvalaibleSpotsByDuration(durationSelection) {


    return this.realSpots.reduce((arrayslot, realSlot) => {
      arrayslot.push(...realSlot.getEmptySlotsByDuration(this.durationBefore, durationSelection, this.durationAfter))
      return arrayslot
    }, []);
  }


}

module.exports = CalendarLogic