const moment = require('moment')
const { CalendarFileReader } = require('./calendar-reader')
const { CalendarLogic } = require('./calendar-logic')

// crear clase calendar 
// inyeccion de dependencias del reader de archivos crear adaptador (read) 
// dependencias del moment tambien puede ser buena idea  directamente porque es grande la impl
//calendar :
// calendarId, date, duration, rawdatacalendar
//dateIso
const calendarReader = new CalendarFileReader()


function getAvailableSpots(calendarId, dateKey, durationSelection) {

	const calendar = new CalendarLogic(calendarId, dateKey, calendarReader)


	calendar.filterDaySlots()

	calendar.filterEmptySpots()

	return calendar.getAvalaibleSpotsByDuration(durationSelection);
}



module.exports = { getAvailableSpots }
