import calendarApi from '../../src/api/calendarApi'

describe('TEST on calendarApi', ()=>{
    test('Should', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })

    test('Should have the x-token in all request', async()=>{
        const token = '123-123-123'
        localStorage.setItem('token',token);
        const resp = await calendarApi.get('/auth');
        expect(resp.config.headers['x-token']).toBe(token);
    })
})