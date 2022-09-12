import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDeleteEvent = ({show}) => {

    const { startDeletingEvent } = useCalendarStore();

    const onDeleteEvent = () =>{
      startDeletingEvent();
    }
  return (
    <button className="btn btn-danger fab-danger" onClick={ onDeleteEvent } style={{ display: show ? 'block':'none' }}>
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
