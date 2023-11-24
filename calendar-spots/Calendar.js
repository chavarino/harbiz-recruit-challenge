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
	/*let calendarData = calendarReader.read(calendarId)

	const dateISO = moment(dateKey, 'DD-MM-YYYY').format('YYYY-MM-DD')
	let durationBefore = calendarData.durationBefore;
	let durationAfter = calendarData.durationAfter;
	let daySlots = []
	for (const key in calendarData.slots) { //get slot filtered by input date 10-04-2023
		if (key === dateKey) {
			daySlots = calendarData.slots[key]
		}
	}*/
	const calendar = new CalendarLogic(calendarId, dateKey, calendarReader)


	calendar.filterDaySlots()

	calendar.filterEmptySpots()

	return calendar.getAvalaibleSpotsByDuration(durationSelection);
}



/*
function getAvailableSpotsDeprecated(calendar, date, duration ) {
	let rawdata = fs.readFileSync('./calendars/calendar.' + calendar + '.json');
	let data = JSON.parse(rawdata);
 
	const dateISO = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
	let durationBefore = data.durationBefore;
	let durationAfter = data.durationAfter;
	let daySlots = []
	for (const key in data.slots) { //get slot filtered by input date 10-04-2023
		if (key === date) {
			daySlots = data.slots[key]
		}
	}

	const realSpots = []
	daySlots.forEach(daySlot => {
		if (data.sessions && data.sessions[date]) {
			let noConflicts = true
			data.sessions[date].forEach(sessionSlot => {
				let sessionStart = moment(dateISO + ' ' + sessionSlot.start).valueOf()
				let sessionEnd = moment(dateISO + ' ' + sessionSlot.end).valueOf()
				let start = moment(dateISO + ' ' + daySlot.start).valueOf()
				let end = moment(dateISO + ' ' + daySlot.end).valueOf()
				if (sessionStart > start && sessionEnd < end) {
					realSpots.push({ start: daySlot.start, end: sessionSlot.start})
					realSpots.push({ start: sessionSlot.end, end: daySlot.end})
					noConflicts = false
				} else if (sessionStart === start && sessionEnd < end) {
					realSpots.push({ start: sessionSlot.end, end: daySlot.end})
					noConflicts = false
				} else if (sessionStart > start && sessionEnd === end) {
					realSpots.push({ start: daySlot.start, end: sessionSlot.start})
					noConflicts = false
				} else if (sessionStart === start && sessionEnd === end) {
					noConflicts = false
				}
			})
			if (noConflicts) {
				realSpots.push(daySlot)
			}
		} else {
			realSpots.push(daySlot)
		}
	})

	let arrSlot = [];
	realSpots.forEach(function (slot) {
		let init = 0;
		let startHour;
		let endHour;
		let clientStartHour;
		let clientEndHour;

		function getMomentHour(hour) {
		  let finalHourForAdd = moment(dateISO + ' ' + hour);
		  return finalHourForAdd;
		}
		function addMinutes(hour, minutes) {
		  let result = moment(hour).add(minutes, 'minutes').format('HH:mm');
		  return result;
		}
		function removeMinutes(hour, minutes) {
		  let result = moment(hour).subtract(minutes, 'minutes').format('HH:mm');
		  return result;
		}
		function getOneMiniSlot(startSlot, endSlot) {
		  let startHourFirst = getMomentHour(startSlot);
		  
			startHour = startHourFirst.format('HH:mm');;
			endHour = addMinutes(startHourFirst, durationBefore + duration + durationAfter);
			clientStartHour = addMinutes(startHourFirst, durationBefore);
			clientEndHour = addMinutes(startHourFirst, duration);

		  if (moment.utc(endHour, 'HH:mm').valueOf() > moment.utc(endSlot, 'HH:mm').valueOf()) {
			return null;
		  } 
		  const objSlot = {
			startHour: moment.utc(dateISO + ' ' + startHour)
			  .toDate(),
			endHour: moment.utc(dateISO + ' ' + endHour)
			  .toDate(),
			clientStartHour: moment.utc(dateISO + ' ' + clientStartHour)
			  .toDate(),
			clientEndHour: moment.utc(dateISO + ' ' + clientEndHour)
			  .toDate(),
		  };
		  init += 1;
		  return objSlot;
		}

		let start = slot.start;
		let resultSlot;
		do {
		  resultSlot = getOneMiniSlot(start, slot.end);
		  if (resultSlot) {
			arrSlot.push(resultSlot);
			start = moment.utc(resultSlot.endHour).format('HH:mm')
		  }
		} while (resultSlot);

		return arrSlot;
	});
	return arrSlot;
}*/

module.exports = { getAvailableSpots }
