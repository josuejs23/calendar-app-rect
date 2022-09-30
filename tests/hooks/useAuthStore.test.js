import { configureStore } from "@reduxjs/toolkit"
import { renderHook, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Provider } from "react-redux"
import { calendarApi } from "../../src/api"
import { useAuthStore } from "../../src/hooks"
import { authSlice } from "../../src/store"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials, testUserCredentialsWrong } from "../fixtures/testUser"

const getMockStore = (state) => {

    return configureStore({
        reducer:{
            auth:authSlice.reducer
        },
        preloadedState:{
            auth:{...state}
        }
    })
}
describe('TEST on useAuthSore() hook', () => {

    beforeEach(()=> localStorage.clear());

    test('Should return the iniitial state', () => {

        // const state = {status:'authorized', user:{name:'jouse',email:'josue@mail.com'}}
        const mockStore = getMockStore({...initialState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })
        // console.log(result.current );
        expect(result.current).toEqual({
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
            status: 'checking',
            user: {},
            errorMessage: undefined
        });
    })

    test('startLogin should make the login', async () =>{
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })
        await act(  async ()=>{
            await result.current.startLogin(testUserCredentials)
        })
        const { status, errorMessage, user } = result.current
        expect({ status, errorMessage, user }).toEqual(
            {
                status:'authenticated',
                errorMessage:undefined,
                user:{ name: 'Test User', id: '633235fe9ab5290f2047d6f8' }
            }
        )
        expect(localStorage.getItem('token')).toEqual( expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual( expect.any(String));
    })

    test('startLogin should fail', async() => { 
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })
        await act(  async ()=>{
            await result.current.startLogin(testUserCredentialsWrong)
        })
        const { status, errorMessage, user } = result.current;
        console.log({status, errorMessage, user})
        expect(localStorage.getItem('token')).toBeNull();
        expect({ status, errorMessage, user }).toEqual(
            {
                status: 'not-authenticated',
                errorMessage: 'Crendenciales incorrectas.',
                user: {}
            }
        )
        await waitFor(()=>{
            () => expect(result.current.errorMessage).toBe(undefined)
        })
     })

    test('startRegister should register a user', async() => {
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data:{
                ok:true,
                uid:'SOME-ID',
                name:'New name',
                token:'SOME-TOKEN'
            }
        })

        await act(  async ()=>{
            await result.current.startRegister({email:'test23spy@gmail.com',password:'12345678',name:'Test User 23'})
        })
        expect(result.current).toEqual(
            {
                startLogin: expect.any(Function),
                startRegister: expect.any(Function),
                checkAuthToken: expect.any(Function),
                startLogout: expect.any(Function),
                status: 'authenticated',
                user: { name: 'New name', uid: 'SOME-ID' },
                errorMessage: undefined
            }
        )
        spy.mockRestore();
    })

    test('startRegister should fail', async () => {
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        await act( async ()=>{
            await result.current.startRegister({email:'test23@gmail.com',password:'12345678',name:'Test User 23'})
        })

        expect(result.current).toEqual({
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
          })

        console.log(result.current)
    })

    test('CheckAuthToken should fail if there is not token', async ()=>{
        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        await act( async ()=>{
            await result.current.checkAuthToken();
        })
        const { status, errorMessage, user } = result.current
        expect( { status, errorMessage, user } ).toEqual({ status: 'not-authenticated', errorMessage: undefined, user: {} })
    })

    test('CheckAuthToken should auth the user if there is a token', async ()=>{

        const { data } = await calendarApi.post('/auth', testUserCredentials)
        localStorage.setItem('token', data.token)

        const mockStore = getMockStore({...notAuthenticatedState})
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        await act( async ()=>{
            await result.current.checkAuthToken();
        })
        const { status, errorMessage, user } = result.current
        console.log({ status, errorMessage, user })
        expect( { status, errorMessage, user } ).toEqual( {
            status: 'authenticated',
            errorMessage: undefined,
            user: { name: 'Test User', uid: '633235fe9ab5290f2047d6f8' }
          })
    })
})