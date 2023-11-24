const moment = require('moment');
const Slot = require('./slot.class');
const RealSlot = require('../real-slot');

describe('Slot', () => {
    it('calculateEmptySlots should populate emptySlots correctly', () => {
        const dateIsoFormated = '2023-01-01';
        const startHour = '08:00';
        const endHour = '17:00';
        const sessionStartHour = '10:00';
        const sessionEndHour = '15:00';

        const slot = new Slot(startHour, endHour, dateIsoFormated);
        const sessionSlot = new Slot(sessionStartHour, sessionEndHour, dateIsoFormated);

        slot.calculateEmptySlots(sessionSlot);

        const expectedEmptySlots = [
            new RealSlot(startHour, sessionStartHour, dateIsoFormated),
            new RealSlot(sessionEndHour, endHour, dateIsoFormated)

        ];

        expect(JSON.stringify(slot.emptySlots)).toEqual(JSON.stringify(expectedEmptySlots));
        expect(slot.noConflicts).toBe(false);
    });

    it('calculateEmptySlots should handle different scenarios correctly: sseion at same time', () => {
        const dateIsoFormated = '2023-01-01';
        const startHour = '08:00';
        const endHour = '17:00';

        const slot = new Slot(startHour, endHour, dateIsoFormated);
        const sessionSlotSameTime = new Slot(startHour, endHour, dateIsoFormated);

        slot.calculateEmptySlots(sessionSlotSameTime);
        expect(slot.emptySlots).toEqual([]);
        expect(slot.noConflicts).toBe(false);
 
    });


    it('calculateEmptySlots should handle different scenarios correctly: at start', () => {
        const dateIsoFormated = '2023-01-01';
        const startHour = '08:00';
        const endHour = '17:00';

        const slot = new Slot(startHour, endHour, dateIsoFormated);
        const sessionSlotAtStart = new Slot(startHour, '12:00', dateIsoFormated);

 

 

        slot.calculateEmptySlots(sessionSlotAtStart);
        expect(JSON.stringify(slot.emptySlots)).toEqual(JSON.stringify([new RealSlot('12:00', '17:00', dateIsoFormated)]));
        expect(slot.noConflicts).toBe(false);
 
    });

    it('calculateEmptySlots should handle different scenarios correctly: at end', () => {
        const dateIsoFormated = '2023-01-01';
        const startHour = '08:00';
        const endHour = '17:00';

        const slot = new Slot(startHour, endHour, dateIsoFormated);
 
        const sessionSlotAtEnd = new Slot('12:00', endHour, dateIsoFormated);
 

        slot.calculateEmptySlots(sessionSlotAtEnd);
        expect(JSON.stringify(slot.emptySlots)).toEqual(JSON.stringify([new RealSlot('08:00', '12:00', dateIsoFormated)]));
        expect(slot.noConflicts).toBe(false);
    });
    it('getRealSpots should return correct values', () => {
        const dateIsoFormated = '2023-01-01';
        const startHour = '08:00';
        const endHour = '17:00';

        const slotNoConflicts = new Slot(startHour, endHour, dateIsoFormated);
        const slotWithConflicts = new Slot(startHour, endHour, dateIsoFormated);
        slotWithConflicts.noConflicts = false;

        const expectedRealSpotNoConflicts = [new RealSlot(startHour, endHour, dateIsoFormated)];
        const expectedRealSpotWithConflicts = [];

        expect(JSON.stringify(slotNoConflicts.getRealSpots())).toEqual(JSON.stringify(expectedRealSpotNoConflicts));
        expect(JSON.stringify(slotWithConflicts.getRealSpots())).toEqual(JSON.stringify(expectedRealSpotWithConflicts));
    });
});