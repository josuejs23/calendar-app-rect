import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks';
import { useAuthStore } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail:'',
    loginPassword:'12345678'
}

const registerFormFields = {
    registerName:'',
    registerEmail:'',
    registerPassword:'',
    registerPasswordConfirm:''
}

export const LoginPage = () => {

    const { onInputChange:onInputChangeLogin, loginEmail, loginPassword, formState } = useForm(loginFormFields);
    const { 
        onInputChange:onInputChangeRegister, 
        registerName, 
        registerEmail, 
        registerPassword, 
        registerPasswordConfirm 
    } = useForm(registerFormFields);

    const { startLogin, startRegister,errorMessage } = useAuthStore(); 

    const loginSubmit = (event)=>{
        event.preventDefault();
        console.log('Submitted...')
        console.log(formState)
        startLogin({email:loginEmail,password:loginPassword});
    }

    const registerSubmit = (event)=>{
        event.preventDefault();
        if(registerPassword !== registerPasswordConfirm){
            Swal.fire('Error', 'The password dont match.','error');
            return;
        }
        startRegister({registerName, registerEmail, registerPassword, registerPasswordConfirm}) 
    }

    useEffect(() => {
        console.log('ErrorMessage ====> ',errorMessage);
        if(errorMessage !== undefined){
            Swal.fire('Error at auth',errorMessage,'error')
        }
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                onChange={onInputChangeLogin}
                                value={loginEmail}
                                name='loginEmail'
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                onChange={onInputChangeLogin}
                                value={loginPassword}
                                name='loginPassword'
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                onChange={onInputChangeRegister}
                                name='registerName'
                                value={registerName}
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                onChange={onInputChangeRegister}
                                name='registerEmail'
                                value={registerEmail}
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onInputChangeRegister}
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                name='registerPasswordConfirm'
                                value={registerPasswordConfirm}
                                onChange={onInputChangeRegister}
                                placeholder="Repita la contraseña" 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
