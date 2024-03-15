import React from 'react';
import "../static/auth.css";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState} from 'react';

export const Login = () => {

    const [passwordState, setpasswordState] = useState(false)

    return (
        <>

        <div className='form-group'>

        <h1>Sing In</h1>

            <form  style={{display:'flex', flexFlow:'column', rowGap:'10px'}} method="post">

                   
                    <div className="form-floating">

                        <input className="form-control" type="text" id='usernameOrEmail' placeholder='' />

                        <label for='usernameOrEmail'>Username or Email</label>

                    </div>

                       {/* darle funcionalidad con la etiqueta Link de react router */}

                       <p> olvidaste tu usuario?</p>


                    
                    <div className="form-floating">

                        <input className="form-control" type={passwordState? 'text': 'password'} id='password' placeholder='' />

                        <label for='password'>Password</label>

                        <div onClick={()=>{setpasswordState(!passwordState)}}> {

                            passwordState ? <RemoveRedEyeIcon/> : <VisibilityOffIcon/>

                                } </div>

                    </div>

                    {/* darle funcionalidad con la etiqueta Link de react router */}

                    <p> olvidaste tu constrasena?</p>


                    <button className='btn btn-primary' type="submit">Login</button>

            </form>

        </div>
            
        </>
    );
}

