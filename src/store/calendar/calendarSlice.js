import { createSlice } from '@reduxjs/toolkit';

// import { addHours } from 'date-fns';
// const tempEvent =   {
//     _id: new Date().getTime(),
//     title:'My birthday event 1',
//     notes:'Go to the party',
//     start: new Date(),
//     end: addHours(new Date(),1),
//     bgColor:'#fafafa',
//     user:{
//       uid:'123abc',
//       name:'Josue Zorrilla'
//     }
//   };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoading:true,
        events:[],
        activeEvent:null
    },
    reducers: {
        onSetActiveEvent: (state, action  ) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action) =>{
          state.events.push(action.payload);
          state.activeEvent = null;
        },
        onUpdateEvent: (state, action) =>{
          state.events = state.events.map( event => {
            if(event.id === action.payload.id){
              return action.payload;
            }
            return event;
          })
        },
        onDeleteEvent: (state) => {
          if(state.activeEvent){
            state.events = state.events.filter( event => event.id !== state.activeEvent.id );
            state.activeEvent = null;
          }
        },
        onLoadEvents:(state, {payload = []}) =>{
          state.isLoading = false;
          payload.forEach(event => {
            const exist = state.events.some(dbEvent => dbEvent.id === event.id);
            if(!exist){
              state.events.push(event);
            }
          })
        },
        onLogoutCalendar:(state)=>{
          state.activeEvent = null;
          state.events = []
        }

    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;