import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEventBox, CalendarModal } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useDispatch } from 'react-redux';
import { onSetActiveEvent } from '../../store';
import { FabNewEvent } from '../components/FabNewEvent';
import { FabDeleteEvent } from '../components/FabDeleteEvent';

 
export const CalendarPage = () => {

  const { openDateModal } = useUiStore();

  const dispatch = useDispatch();

  const { events, activeEvent, setActiveEvent, hasEventSelected } = useCalendarStore();

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week')
  
  const eventStyleGetter = ( event, start, end, isSelected) =>{

    const style = {
      backgroundColor : '#347CF7',
      borderRadius : '0px',
      opacity: '0.8',
      color:'white'
    }

    return {style};
  }

  const onDoubleClick = (event) =>{
    setActiveEvent(event);
    openDateModal();
  }
  const onSelect = (event) =>{
    console.log({select:event})
  }
  const onChangeView = (event) =>{
    localStorage.setItem('lastView',event)
    setLastView(event);
  }

  const onNewEvent = ()=>{
    console.log('New Event...')
  }

  return (
    <>
      <Navbar/>
      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 100px)' }}
      messages={getMessagesES()}
      eventPropGetter={ eventStyleGetter }
      components={{
        event:CalendarEventBox
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onChangeView}
    />
    <CalendarModal/>
    <FabDeleteEvent show={hasEventSelected}/>
    <FabNewEvent/>
    </>
  )
}
