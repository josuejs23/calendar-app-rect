export const events = [
    {
        id:'1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Event title',
        notes: 'Notes of the event'
    },
    {
        id:'2',
        start: new Date('2022-11-21 13:00:00'),
        end: new Date('2022-11-21 15:00:00'),
        title: 'Event title 2',
        notes: 'Notes of the event 2'
    }
]

export const initialState = {
    isLoading:true,
    events:[],
    activeEvent:null
}

export const calendarWithEventsState = {
    isLoading:false,
    events:[...events],
    activeEvent:null
}
export const calendarWithActiveEventState = {
    isLoading:false,
    events:[...events],
    activeEvent:{...events[0]}
}