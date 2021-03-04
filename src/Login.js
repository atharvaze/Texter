import React, { useState } from 'react'
import {Button} from '@material-ui/core'
import './Login.css'
import { auth,provider } from './firebase'
import { useStateValue } from './StateProvider'
import {actionTypes} from './reducer'
function Login() {
    const [state,dispatch] = useStateValue();
    const signIn = ()=>{
        auth.signInWithPopup(provider).then(result=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        }).catch(err=>{
            alert(err.message)
        })
    }
    
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://i.pinimg.com/originals/c0/bd/cf/c0bdcf3439a487beb2b622a94680477d.jpg"
                alt="texter"/>
                <div className="login__text">
                    <h1>Texter</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In with google
                </Button>
            </div>
        </div>
    )
}

export default Login
