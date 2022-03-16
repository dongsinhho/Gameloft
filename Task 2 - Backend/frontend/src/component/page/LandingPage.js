import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import "./LandingPage.css"

const LandingPage = () => {
    const [email, setEmail] = useState('')
    const handleSubmit = (event) => {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };
        if (validateEmail(email)) {
            fetch('http://localhost:4000/api/get-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ "email" : email })
            }).then(response => response.json())
            .then(data => {
                if (data.token) {
                    //document.cookie = "accessToken=" + data.token + ";expires=Thu, 18 Dec 2023 12:00:00 UTC"
                    window.location.href = '/home'
                } else {
                    alert(data.message)
                }
            })
        } else {
            alert("Email không hợp lệ")
        }
        event.preventDefault()
    }
    return (
        <div>
            <form className="container" onSubmit={handleSubmit}>
                <div className='login'>
                    <input
                        placeholder='Type your email here'
                        name='name'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button type='Submit'>Get token</button>
                </div>
                <div className='register'>
                    <Link className='link' to="/create">You haven't registered yet? Create now !!!</Link>
                </div>
            </form>
        </div>
    )
}

export default LandingPage