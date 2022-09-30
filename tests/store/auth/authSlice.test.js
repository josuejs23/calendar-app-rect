import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initalState, notAuthenticatedState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser"

describe('TEST on authSlice', () => { 
    test('Should return the initial state', () => {
        expect(authSlice.getInitialState()).toEqual( initalState )
    })

    test('Should execute the login', () => {
        const state = authSlice.reducer(initalState, onLogin(testUserCredentials));

        expect(state).toEqual({
            status:'authenticated',
            user:testUserCredentials,
            errorMessage:undefined    
        })
    })

    test('Should execute the logout', () => {
        const state = authSlice.reducer(initalState, onLogout());

        expect(state).toEqual(notAuthenticatedState);

    })

    test('Should execute the logout with the message error', () => {

        const errorMessage = 'Error at auth'
        const state = authSlice.reducer(initalState, onLogout(errorMessage));

        expect(state).toEqual({
            errorMessage,
            user:{},
            status : 'not-authenticated', 
        });

    })

    test('Should clear the errorMessage', () => {
        const errorMessage = 'Error at auth'
        const state = authSlice.reducer(initalState, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearErrorMessage)

        expect(newState.errorMessage).toBe(undefined);
    })
 })