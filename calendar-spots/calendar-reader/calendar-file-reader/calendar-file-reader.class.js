const CalendarReaderInterface = require('../calendar-reader.interface')
const fs = require('fs');



class CalendarFileReader extends CalendarReaderInterface {


    read(calendarId) {

        let rawdata = fs.readFileSync('./calendars/calendar.' + calendarId + '.json');

        return JSON.parse(rawdata);

    }

}




module.exports = CalendarFileReader;
