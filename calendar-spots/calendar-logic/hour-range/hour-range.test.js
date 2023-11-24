const moment = require('moment');
const HourRange = require('./hour-range.class'); 

describe('HourRange', () => {
  it('constructor should set properties correctly', () => {
    const dateIsoFormated = '2023-01-01';
    const startHour = '08:00';
    const endHour = '17:00';

    const hourRange = new HourRange(startHour, endHour, dateIsoFormated);

    expect(hourRange.getDateIsoFormated()).toBe(dateIsoFormated);
    expect(hourRange.getStartHour()).toBe(startHour);
    expect(hourRange.getEndHour()).toBe(endHour);
    expect(hourRange.getFormatedStartHour()).toBe(moment(dateIsoFormated + ' ' + startHour).valueOf());
    expect(hourRange.getFormatedEndHour()).toBe(moment(dateIsoFormated + ' ' + endHour).valueOf());
  });

  it('getters should return correct values', () => {
    const dateIsoFormated = '2023-01-01';
    const startHour = '08:00';
    const endHour = '17:00';

    const hourRange = new HourRange(startHour, endHour, dateIsoFormated);

    expect(hourRange.getDateIsoFormated()).toBe(dateIsoFormated);
    expect(hourRange.getStartHour()).toBe(startHour);
    expect(hourRange.getEndHour()).toBe(endHour);
    expect(hourRange.getFormatedStartHour()).toBe(moment(dateIsoFormated + ' ' + startHour).valueOf());
    expect(hourRange.getFormatedEndHour()).toBe(moment(dateIsoFormated + ' ' + endHour).valueOf());
  });
});