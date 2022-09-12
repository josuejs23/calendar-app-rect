import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabNewEvent = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const onAddNewEvent = () =>{
        setActiveEvent({
            title:'',
            notes:'',
            start: new Date(),
            end: addHours(new Date(),1),
            bgColor:'#fafafa',
            user:{
              uid:'123abc',
              name:'Josue Zorrilla'
            }
          })
        openDateModal();
        console.log('Add new event.')
    }
  return (
    <button className="btn btn-primary fab" onClick={ onAddNewEvent}>
        <i className="fas fa-plus"></i>
    </button>
  )
}
