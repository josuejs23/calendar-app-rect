import { useDispatch, useSelector } from 'react-redux';
import {calendarApi} from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';

export const useAuthStore = ()=>{

    const { status, user, errorMessage} = useSelector( state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async ({email,password}) =>{
        console.log({email, password});
        
        dispatch(onChecking());
        
        try{
            const {data} = await calendarApi.post('/auth',{email,password});
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name:data.name, id:data.uid}))
        }catch(error){
            console.log(error)
            dispatch(onLogout('Crendenciales incorrectas.'));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10)
        }
    }

    const startRegister = async({registerName:name, registerEmail:email, registerPassword:password }) => {
        dispatch(onChecking());
        try{
            console.log({name, email, password })
            const {data} = await calendarApi.post('/auth/new',{name, email, password,})
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name:data.name, uid:data.uid}));
        }catch(error){
            console.log(error);
            dispatch(onLogout(error.response.data.msg));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10)
        }
    }

    const checkAuthToken = async() =>{
        const token = localStorage.getItem('token');
        console.log('TOKEN', token);
        if(!token) dispatch(onLogout());

        try{
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name:data.name, uid:data.uid}));
        } catch(error){
            localStorage.clear();
            dispatch(onLogout);
        }
    }

    const startLogout = ()=>{
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        status,
        user,
        errorMessage
    }
}

