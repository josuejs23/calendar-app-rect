import { ca } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from '../store/calendar/calendarSlice'


export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar);
    const { user } = useSelector( state => state.auth);

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startLoadingEvents = async () =>{
        try{
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);
            dispatch(onLoadEvents(events));
            console.log('eventsFormated',events);
        }catch(error){
            dispatch()
            console.log(error)
        }
    }

    const startSavingEvent = async(calendarEvent) =>{

        try{
            if(calendarEvent.id){
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent}, user));
                return;
            }

            const {data} = await calendarApi.post('/events', {...calendarEvent})
            console.log('Event creadted', data.event);
            dispatch(onAddNewEvent({...calendarEvent, id : data.event.id, user }))
        } catch(error){
            console.log('RUEDE PONE MANO!',error);
            Swal.fire('Error',error.response.data.msg,'error')
        }

        
    }

    const startDeletingEvent = async ()=>{
        try{
            console.log(activeEvent)
            await calendarApi.delete(`/events/${activeEvent.id}`)
        } catch(error){
            console.log(error);
        }
        dispatch(onDeleteEvent());
    }
  
    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
        startDeletingEvent
    }
}
