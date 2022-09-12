import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent =   {
    _id: new Date().getTime(),
    title:'My birthday event 1',
    notes:'Go to the party',
    start: new Date(),
    end: addHours(new Date(),1),
    bgColor:'#fafafa',
    user:{
      uid:'123abc',
      name:'Josue Zorrilla'
    }
  };

const tempEvent2 = {
    title:'Event 2',
    notes:'Event 2 note',
    start: addHours(new Date(),24),
    end: addHours(new Date(),25),
    bgColor:'#fafafa',
    user:{
      uid:'123abc',
      name:'Josue Zorrilla Cabra'
    }
  };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events:[tempEvent],
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
            if(event._id === action.payload._id){
              return action.payload;
            }
            return event;
          })
        },
        onDeleteEvent: (state) => {
          state.events = state.events.filter( event => event._id ==! state.activeEvent._id);
          state.activeEvent = null;
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;