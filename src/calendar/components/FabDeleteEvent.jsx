import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDeleteEvent = ({show}) => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const onDeleteEvent = () =>{
      startDeletingEvent();
    }
  return (
    <button className="btn btn-danger fab-danger" onClick={ onDeleteEvent } style={{ display: hasEventSelected ? '':'none' }}>
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
