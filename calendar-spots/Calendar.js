const moment = require('moment')
const { CalendarFileReader } = require('./calendar-reader')
const { CalendarLogic } = require('./calendar-logic')


const calendarReader = new CalendarFileReader()


function getAvailableSpots(calendarId, dateKey, durationSelection) {

	const calendar = new CalendarLogic(calendarId, dateKey, calendarReader)


	calendar.filterDaySlots()

	calendar.filterEmptySpots()

	return calendar.getAvalaibleSpotsByDuration(durationSelection);
}



module.exports = { getAvailableSpots }
