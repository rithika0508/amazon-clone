import React, { useState } from 'react'
import "./Login.css";
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const history = useHistory()
    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => history.push('/'))
            .catch((error) => alert(error.message))
        
    }
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push('/')
            })
            .catch((err) => alert(err.message))
    }
    return (
        <div className="login">
            <Link to="/"><img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""/></Link>
            <div className="login__container">
                <h1>Sign in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"/>

                    <h5>Password</h5>
                    <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"/>

                    <button type="submit" onClick={signIn} className="login__signinButton">Sign-in</button>
                </form>
                <p>
                    By signing-in you agree to AMAZON FAKE CLONE
                    Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice
                    and our Intrest-Based Ads Notice.
                </p>

                <button onClick={register} className="login__registerButton">Create your amazon account</button>
            </div>
        </div>
    )
}

export default Login
