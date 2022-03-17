import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignUp.css'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')

    const handleSubmit = (event) => {
        fetch('http://localhost:4000/api/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({ 
                    "username": username,
                    "email" : email,
                    "birthday": (new Date(birthday).getTime())/1000
                })
            }).then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message)
                } else {
                    alert("Created")
                }
            })
        event.preventDefault()
    }   
    return (
        <div>
            <form id='create' onSubmit={handleSubmit}>
                <h5><strong>*Note:</strong> This form has not been validated in react </h5>
                <h1>Create User</h1>
                <input onChange={e => setUsername(e.target.value)} type="text" name="Username" placeholder='Username'/>
                <input onChange={e => setEmail(e.target.value)} type="text" name="Email" placeholder='Email'/>
                <input onChange={e => setBirthday(e.target.value)} type="date" name="Birthday" placeholder="Birthday" max={3/17/2022}/>
                <input type="submit" value="Submit" />
                <Link className='link' to="/">Get token !!!</Link>
            </form>
        </div>
    )
}

export default SignUp