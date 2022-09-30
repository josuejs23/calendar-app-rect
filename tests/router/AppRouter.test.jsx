import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../../src/calendar"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from "../../src/router/AppRouter"

jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/calendar', () => ({
    CalendarPage: ()=> <h1>Calendar Page</h1>
}))

describe('TEST on AppRouter', () => { 

    const mockCheckAuthToken = jest.fn();
    
    beforeEach( () => jest.clearAllMocks() );

    test('Should render the AppRouter', () => {
        useAuthStore.mockReturnValue({
            status:'checking',
            checkAuthToken:mockCheckAuthToken
        })
        render(<AppRouter/>)
        expect(screen.getByText('Loading.....')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();
        // screen.debug();
    })

    test('Should render the LoginPage', () => {
        useAuthStore.mockReturnValue({
            status:'not-authenticated',
            checkAuthToken:mockCheckAuthToken
        })
        const {container } = render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        )

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot()
        // expect(screen.getByText('Loading.....')).toBeTruthy();
        // expect(mockCheckAuthToken).toHaveBeenCalled();
        screen.debug();
    })

    test('Should render the Calendar', () => {
        useAuthStore.mockReturnValue({
            status:'authenticated',
            checkAuthToken:mockCheckAuthToken
        })
        render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        )

        expect(screen.getByText('Calendar Page')).toBeTruthy();
        // expect(container).toMatchSnapshot()
     
        screen.debug();
    })
 })