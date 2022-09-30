import { configureStore } from "@reduxjs/toolkit"
import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Provider } from "react-redux"
import { useUiStore } from "../../src/hooks"
import { store, uiSlice } from "../../src/store"

const getMockStore = (initialState) => {
    return configureStore({
        reducer:{
            ui:uiSlice.reducer
        },
        preloadedState:{
            ui:{...initialState}
        }
    })
}

describe('TEST on useUiStore hook', () => {

    test('Should return the initial state', () => {

        const mockStore = getMockStore({isDateModalOpen:false})
        const { result } = renderHook( () =>useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } )

         console.log(result)
         expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function)
          })

    })

    test('openDateModal should put true on isDateModalOpen', () => {

        const mockStore = getMockStore({isDateModalOpen:false})
        const { result } = renderHook( () =>useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } )

        const { openDateModal } = result.current;
        act( () =>{
            openDateModal();
        })

        expect(result.current.isDateModalOpen).toBeTruthy();
    })

    test('closeDateModal should change to false of isDateModalOpen', ()=>{

        const mockStore = getMockStore({isDateModalOpen:true});
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={store}> {children} </Provider>
        })

        const { closeDateModal } = result.current;

        // The act() work when with want to change the state
        act( ()=>{
            closeDateModal();
        });
        console.log(result.current.isDateModalOpen);
    })
})