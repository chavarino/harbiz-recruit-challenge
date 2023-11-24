const CalendarFileReader = require('./calendar-file-reader.class');
const fs = require('fs');

// Mock de fs.readFileSync
jest.mock('fs');

describe('CalendarFileReader', () => {
  afterEach(() => {
    // Restaurar mocks después de cada prueba
    jest.restoreAllMocks();
  });

  it('should read the calendar file and parse it', () => {
    const calendarId = 'test';
    const calendarData = { events: [{ title: 'Event 1' }, { title: 'Event 2' }] };

    // Configurar el mock de fs.readFileSync
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(JSON.stringify(calendarData));

    // Instanciar la clase CalendarFileReader
    const calendarFileReader = new CalendarFileReader();

    // Llamar al método read con el id del calendario
    const result = calendarFileReader.read(calendarId);

    // Verificar que fs.readFileSync fue llamado con la ruta correcta
    expect(fs.readFileSync).toHaveBeenCalledWith(`./calendars/calendar.${calendarId}.json`);

    // Verificar que el resultado sea el esperado
    expect(result).toEqual(calendarData);
  });
});