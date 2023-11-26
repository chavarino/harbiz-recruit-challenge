const moment = require('moment')
const { CalendarFileReader } = require('./calendar-reader')
const { CalendarLogic } = require('./calendar-logic')


const calendarReader = new CalendarFileReader()


function getAvailableSpots(calendarId, dateKey, durationSelection) {



	if (!calendarId || !dateKey || !durationSelection) {
		throw new Error("Invalid input parameters. calendarId, dateKey, and durationSelection are required.");
	}
	const calendar = new CalendarLogic(calendarId, dateKey, calendarReader)


	calendar.filterDaySlots()

	calendar.filterEmptySpots()

	return calendar.getAvalaibleSpotsByDuration(durationSelection);

}



module.exports = { getAvailableSpots }
