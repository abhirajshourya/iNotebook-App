import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Signup(props) {
    const host = "http://localhost:5000"

    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confPassword: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })

        const json = await response.json()

        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.alertMaker("Signup Successfull!", "success")
        }
        else {
            props.alertMaker(json.error, "danger")
        }

    }
    return (
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="name" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
            </div>
            <div className="mb-3">
                <label htmlFor="confPassword" className="form-label">Confirm Password</label>
                <input type="confPassword" className="form-control" value={credentials.confPassword} onChange={onChange} id="confPassword" name="confPassword" />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    )
}
