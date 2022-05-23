import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const host = "http://localhost:5000"

    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({email:"", password:""})

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password:credentials.password})
        })

        const json = await response.json()

        if(json.success){
            //Save auth-token and redirect
            props.alertMaker("Logged In!", "success")
            localStorage.setItem('token', json.authToken)
            navigate("/")
        }
        else{
            props.alertMaker("Invalid Credentials", "danger")
        }
    }
    return (
        <form onSubmit={handleOnSubmit} className="m-5">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
            </div>
            <button type="submit" className="btn btn-info" >Submit</button>
        </form>
    )
}
