const moment = require('moment')
const { Session, Slot, RealSlot } = require('./hour-range')

class CalendarLogic {



  constructor(calendarId, dateKey, calendarReader) {
    this.calendarId = calendarId;
    this.dateKey = dateKey;

    this.calendarData = calendarReader.read(this.calendarId)

    this.checkCalendarData();
    this.durationBefore = this.calendarData.durationBefore;
    this.durationAfter = this.calendarData.durationAfter;
    this.dateISO = moment(dateKey, 'DD-MM-YYYY').format('YYYY-MM-DD')
    this.daySlots = []
    this.realSpots = []

  }

  checkCalendarData() {


    if (!this.calendarData || typeof this.calendarData !== 'object') {
      throw new Error('Invalid configuration object.');
    }

    const requiredFields = ['durationBefore', 'durationAfter', 'slots', 'sessions'];
    for (const field of requiredFields) {
      if (!(field in this.calendarData)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (typeof this.calendarData.durationBefore !== 'number' || typeof this.calendarData.durationAfter !== 'number') {
      throw new Error('Invalid duration values.');
    }

    if (typeof this.calendarData.slots !== 'object' || typeof this.calendarData.sessions !== 'object') {
      throw new Error('Invalid slots or sessions structure.');
    }
    for (const dateKey in this.calendarData.slots) {
      if (!Array.isArray(this.calendarData.slots[dateKey]) || !this.calendarData.slots[dateKey].length) {
        throw new Error(`Invalid slots structure for date ${dateKey}`);
      }
    }

    for (const dateKey in this.calendarData.sessions) {
      if (!Array.isArray(this.calendarData.sessions[dateKey]) || !this.calendarData.sessions[dateKey].length) {
        throw new Error(`Invalid sessions structure for date ${dateKey}`);
      }
    }
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

    if (
      typeof durationSelection !== 'number' || durationSelection < 0
    ) {
      throw new Error("Invalid duration. It must be a number greater than or equal to zero.");
    }
    return this.realSpots.reduce((arrayslot, realSlot) => {
      arrayslot.push(...realSlot.getEmptySlotsByDuration(this.durationBefore, durationSelection, this.durationAfter))
      return arrayslot
    }, []);
  }


}

module.exports = CalendarLogic