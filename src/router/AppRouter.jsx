import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

    // const status = 'not-authenticated';
    const { status, checkAuthToken } =  useAuthStore()
    // const { status } = useSelector( state => state.auth);

    useEffect(() => {
      checkAuthToken();
    }, [])
    

    if(status === "checking"){
      return (
        <h3>Loading.....</h3>
      )
    }

  return (
    <Routes>
        {
            (status === 'not-authenticated')
            ?
            (
              <>
                <Route path="/auth/*" element={<LoginPage/>}/>
                <Route path="/*" element={<Navigate to='/auth/login'/>}/>
              </>
            )
            :
            (
              <>
                <Route path="/" element={<CalendarPage/>}/>
                <Route path="/*" element={<Navigate to='/'/>}/>

              </>
            )
        }  
    </Routes>
  )
}
