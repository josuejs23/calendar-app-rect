import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates"
describe('TEST on calendarSlice', () => {
    
    test('Should return the initial state', () => {
        expect(calendarSlice.getInitialState()).toEqual(initialState)
    })

    test('onSetActiveEvent should active the event', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))
        expect(state.activeEvent).toEqual(events[0]);
    })

    test('onAddNewEvent should add a new event to the state.', () => {
        
        const newEvent =  {
            id:'3',
            start: new Date('2022-12-21 13:00:00'),
            end: new Date('2022-12-21 15:00:00'),
            title: 'Event title 3',
            notes: 'Notes of the event 3'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
        expect(state.events.length).toBe(3)
        expect(state.events[2]).toEqual(newEvent)
    })

    test('onUpdateEvent should update an event on the state.', () => {

        const newEvent =  {
            id:'3',
            start: new Date('2022-12-21 13:00:00'),
            end: new Date('2022-12-21 15:00:00'),
            title: 'Event title 3',
            notes: 'Notes of the event 3'
        }
        
        const newEventUpdated =  {
            id:'3',
            start: new Date('2022-12-21 13:00:00'),
            end: new Date('2022-12-21 15:00:00'),
            title: 'Event title 3 updated',
            notes: 'Notes of the event 3'
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
        const newState = calendarSlice.reducer(state, onUpdateEvent(newEventUpdated))
        expect(state.events.length).toBe(3)
        expect(newState.events[2].title).toBe(newEventUpdated.title);
    })

    test('onDeleteEvent should delete the active event.', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())
        expect(state.activeEvent).toBeNull()
        expect(state.events.length).toBe(1)
        
    })

    test('onLoadEvents should load the events.', () => {

        const state = calendarSlice.reducer(initialState, onLoadEvents(events))
        expect(state.events).toStrictEqual(events)
        expect(state.isLoading).toBeFalsy();

    })

    test('onLogoutCalendar should load the events.', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar())
        expect(state.activeEvent).toBeNull()
        expect(state.events.length).toBe(0);

    })

})