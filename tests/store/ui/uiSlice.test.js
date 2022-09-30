import { onOpenDateModal, onCloseDateModal } from '../../../src/store/ui/uiSlice'
import { uiSlice } from "../../../src/store/ui/uiSlice"


describe('TEST on uiSlice', ()=>{


    test('Should return the initalState',() => {
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
    })

    test('Should change the state',() => {
        let state = uiSlice.getInitialState();

        state = uiSlice.reducer(state,onOpenDateModal);
        expect( state.isDateModalOpen ).toBeTruthy();
        
        state = uiSlice.reducer(state,onCloseDateModal);
        expect( state.isDateModalOpen ).toBeFalsy();
    })

   

})