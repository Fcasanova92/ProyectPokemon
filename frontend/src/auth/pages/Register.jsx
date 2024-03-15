import React from 'react';
import { useState, useEffect} from 'react';
import {addRegister, fetchUser, regValidator, regex} from '../helpers'
import {useNavigate, Link } from 'react-router-dom'
import '../static/auth.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {CircularProgress} from '@mui/material'




export const Register = () => {

    const [formregisterState, setformregisterState] = useState({

        name:'',
        surname:'',
        username:'',
        email:'',
        password:''

    });


    const [isValidRegisterdState, setisValidRegister] = useState({

        registerValid : false,
        isLoading: false,
        passwordValid: false,
        usernameInvalid: false,
        emailInvalid: false

    });

    const [checkedFilter, setCheckedFilter] = useState(false);


    useEffect(() => {

        setformregisterState({ 
            name:'',
            surname:'',
            username:'',
            email:'',
            password:''})
            
        setCheckedFilter(false)

        ;
    }, [isValidRegisterdState.registerValid]);


    const onInputChange = ({target})=>{

        const {name, value} = target

        setformregisterState({...formregisterState, [name]:value})
 
    }

    const navigate = useNavigate()


    const onRegisterSubmit = async (event) => {

        event.preventDefault();

        const sendData = addRegister(formregisterState)

        const messageResponse = await sendData

        setisValidRegister({...isValidRegisterdState, ...messageResponse.resp, isLoading:true})

        if(messageResponse.status){
            
            const fetchLogUser =  fetchUser()

            const usernameLogin = (await fetchLogUser).username

            const logIn = (await fetchLogUser).login

            setTimeout(() => {
                
                navigate('/', { state: { username: usernameLogin } })

            }, 1000);

        }setisValidRegister({...isValidRegisterdState, ...messageResponse.resp, isLoading:false})
    }


    return (
        <>

        <div className='form-group'>

        <h1>Register</h1>

            <form onSubmit={onRegisterSubmit} style={{display:'flex', flexFlow:'column', rowGap:'10px'}} method="post">

                    <div className="form-floating">

                        <input 
                        
                        onChange={onInputChange}

                        value={formregisterState.name}

                        className="form-control" type="text" id='name' name='name' placeholder='' pattern={regex.text.source}  required />

                        <label htmlFor='name'>Name</label>

                    </div>

                    <span style={{ color: 'red' }}>{regValidator(regex.text, formregisterState.name) ? '' : 'Ingrese solo letras'}</span>

                    
                    <div className="form-floating">

                        <input 

                        onChange={onInputChange}

                        value={formregisterState.surname}

                        className="form-control" type="text" id='surname' name='surname' placeholder='' pattern={regex.text.source}  required />

                        <label htmlFor='surname'>Surname</label>

                    </div>

                    <span style={{ color: 'red' }}>{formregisterState.surname === '' || regValidator(regex.text, formregisterState.surname) ? '' : 'Ingrese solo letras'}</span>

                    
                    
                    <div className="form-floating">

                        <input 

                        onChange={onInputChange}

                        onClick={()=>{setisValidRegister({...isValidRegisterdState, usernameInvalid:false})}}

                        value={formregisterState.username}

                        className="form-control" type="text" id='username' name='username' placeholder='' required />

                        <label htmlFor='username'>Username</label>

                    </div>

                    <span style={{display:isValidRegisterdState.usernameInvalid?'flex':'none', color:'red'} }>Usuario existente</span>


                   
                    <div className="form-floating">

                        <input 

                        onChange={onInputChange}

                        onClick={()=>{setisValidRegister({...isValidRegisterdState, emailInvalid:false})}}

                        value={formregisterState.email}

                        className="form-control" type="email" id='email'  name='email' placeholder='' pattern={regex.email.source}  required />

                        <label htmlFor='email'>Email</label>

                    </div>

                    <span style={{display:formregisterState.email === '' ||  regValidator(regex.email, formregisterState.email) ? 'none' : 'flex', color:'red' }}>Ingrese un email valido</span>

                    <span style={{display:isValidRegisterdState.emailInvalid?'flex':'none', color:'red'} }>Email existente</span>
                    
                    
                    <div className="form-floating">

                        <input 

                        onChange={onInputChange}

                        value={formregisterState.password}

                        className="form-control" type={ isValidRegisterdState.passwordValid? 'text': 'password'} id='password' name='password' placeholder=''  pattern={regex.password.source} required/>

                        <label htmlFor='password'>Password</label>

                        <div onClick={()=>{setisValidRegister({...isValidRegisterdState, passwordValid:!isValidRegisterdState.passwordValid})}}> {

                            isValidRegisterdState.passwordValid ?  <RemoveRedEyeIcon/> : <VisibilityOffIcon/>

                        } </div>

                    </div>

                    <ul style={{ color: 'red' }}>{formregisterState.password === '' || regValidator(regex.password, formregisterState.password) ? '' : 
                    
                    <>
                            <li style={{color: formregisterState.password.length>8 ?'green':'red'}} > Minimo 8 caracteres</li>
                            <li style={{color: formregisterState.password.length<15 ?'green':'red'}} > Maximo 15 caracteres</li>
                            <li style={{color: regValidator(/(?=.*\d)/, formregisterState.password )?'green':'red'}}> Al menos un numero</li>
                            <li style={{color: regValidator(/.*[A-Z].*/, formregisterState.password )?'green':'red'}}>Al menos una letra mayúscula</li>
                            <li style={{color: regValidator(/(?=.*?[#?!@$ %^&*-])/, formregisterState.password )?'green':'red'}}>Al menos 1 caracter especial</li>
                    
                    </>
                    }</ul>

                    <label htmlFor=""><input checked={checkedFilter} onChange={()=>{setCheckedFilter(!checkedFilter)}} type="checkbox" name="" id=""  required /> Acepta los terminos y condiciones</label>

                    <button className={isValidRegisterdState.registerValid?'btn btn-success':'btn btn-primary'}  type='submit' >{isValidRegisterdState.registerValid? <CircularProgress size={20} color='inherit'/>:'Register'} </button>


            </form>

            <Link to="/login" relative="path">¿Ya tenés una cuenta? Iniciá sesión</Link>


        </div>
            
        </>
    );
}



