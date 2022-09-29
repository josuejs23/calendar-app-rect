import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEventBox, CalendarModal } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveEvent } from '../../store';
import { FabNewEvent } from '../components/FabNewEvent';
import { FabDeleteEvent } from '../components/FabDeleteEvent';

 
export const CalendarPage = () => {

  const { user } = useSelector(state => state.auth);
  console.log('User id: ',user)

  const { openDateModal } = useUiStore();

  const dispatch = useDispatch();

  const { events, activeEvent, setActiveEvent, startLoadingEvents,hasEventSelected } = useCalendarStore();

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week');

  useEffect(() => {
    startLoadingEvents();
  }, [])
  
  const eventStyleGetter = ( event, start, end, isSelected) =>{
    const isMyEvent = (event.user._id === user.uid) || (event.user.uid === user.uid) 
    const style = {
      backgroundColor : isMyEvent ? '#347CF7':'#465660',
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
    dispatch(onSetActiveEvent(event))
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
    <FabDeleteEvent />
    <FabNewEvent/>
    </>
  )
}
