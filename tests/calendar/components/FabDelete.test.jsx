import { fireEvent, render, screen } from "@testing-library/react"
import { FabDeleteEvent } from "../../../src/calendar/components/FabDeleteEvent"
import { useCalendarStore } from "../../../src/hooks/useCalendarStore"
jest.mock("../../../src/hooks/useCalendarStore")

describe('TEST on FabDelete', () => {

    const mockStartDeletingEvent = jest.fn();
    
    beforeEach( () => jest.clearAllMocks());

    test('Should dont show the button', ()=>{

        useCalendarStore.mockReturnValue({
            hasEventSelected:false
        })
        render(<FabDeleteEvent/>);

        const btn = screen.getByRole('button',{hidden:true});
        // screen.debug();
        expect(btn.className).toBe('btn btn-danger fab-danger');
        expect(btn.style.display).toBe('none');
        // expect(btn.classList)
    })

    test('Should show the component', ()=>{

        useCalendarStore.mockReturnValue({
            hasEventSelected:true,
        })
        render(<FabDeleteEvent/>);

        const btn = screen.getByRole('button');
        expect(btn.style.display).toBe('');
        // expect(btn.className).toBe('btn btn-danger fab-danger');
    })

    test('Should call the startDeleting', ()=>{

        useCalendarStore.mockReturnValue({
            hasEventSelected:true,
            startDeletingEvent:mockStartDeletingEvent
        })
        render(<FabDeleteEvent/>);

        const btn = screen.getByRole('button');
        fireEvent.click(btn)

        expect(mockStartDeletingEvent).toBeCalled();
        // expect(btn.className).toBe('btn btn-danger fab-danger');
    })
})