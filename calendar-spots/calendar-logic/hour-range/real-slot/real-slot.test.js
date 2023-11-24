const RealSlot = require('./real-slot.class'); // Asegúrate de importar la clase desde el archivo correcto

describe('RealSlot', () => {
  it('getEmptySlotsByDuration should return correct empty slots', () => {
    const dateIsoFormated = '2023-01-01';
    const startHour = '08:00';
    const endHour = '09:00';

    const realSlot = new RealSlot(startHour, endHour, dateIsoFormated);
    const durationBefore = 5;
    const duration = 20;
    const durationAfter = 5;

    const emptySlots = realSlot.getEmptySlotsByDuration(durationBefore, duration, durationAfter);

    const expectedEmptySlots = [
      {
        startHour: new Date('2023-01-01T08:00:00.000Z'),
        endHour: new Date('2023-01-01T08:30:00.000Z'),
        clientStartHour: new Date('2023-01-01T08:05:00.000Z'),
        clientEndHour: new Date('2023-01-01T08:20:00.000Z'),
      },
      {
        startHour: new Date('2023-01-01T08:30:00.000Z'),
        endHour: new Date('2023-01-01T09:00:00.000Z'),
        clientStartHour: new Date('2023-01-01T08:35:00.000Z'),
        clientEndHour: new Date('2023-01-01T08:50:00.000Z'),
      } 
    ];

    expect(emptySlots).toEqual(expectedEmptySlots);
  });
 
});