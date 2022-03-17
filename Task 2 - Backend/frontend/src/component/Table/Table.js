import React, { useState } from 'react'
import './Table.css'

const Table = ({ users }) => {
    const [editRow, setEditRow] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')

    const ISOdateToDate = (value) => {
        let date = new Date(value)
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return year + '-' + month + '-' + dt
    }

    const handleClick = (event, row) => {
        event.preventDefault()
        if (event.target.textContent === "Edit") {
            event.target.textContent = "Save"
            setEditRow(row)
        } else {
            event.target.textContent = "Edit"
            const usernameData = username ? {"username":username} : {}
            const emailData = email ? {"email":email} : {}
            const birthdayData = birthday ? {"birthday":(new Date(birthday).getTime())/1000} : {}
            const data = JSON.stringify(Object.assign({"_id" : row}, usernameData, emailData, birthdayData))
            console.log(data)
            fetch('http://localhost:4000/api/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: data,
            }).then(response => {
                if (Array.isArray(response)) {
                    let alertMessage = "There is an error in object number"
                    for (let error in response) {
                        alertMessage = alertMessage + " " + error.object 
                    }
                    alert(alertMessage)
                } else {
                    alert("Updated")
                }
            })     
            setEditRow("")   
        }

    }

    return (
        <div>

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Birthday</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(user => (
                            <tr key={user._id}>
                                <td>
                                    <input
                                        onChange={e => setUsername(e.target.value)}
                                        className={editRow === user._id ? 'editable' : 'nonEditable'}
                                        type="text" name="username"
                                        placeholder={user.username}
                                    />
                                </td>
                                <td>
                                    <input
                                        onChange={e => setEmail(e.target.value)}
                                        className={editRow === user._id ? 'editable' : 'nonEditable'}
                                        type="text" name="email"
                                        placeholder={user.email}
                                    />
                                </td>
                                <td>
                                    <input
                                        onChange={e => setBirthday(e.target.value)}
                                        className={editRow === user._id ? 'editable' : 'nonEditable inputDateNone'}
                                        type="date" name="email"
                                        defaultValue={ISOdateToDate(user.birthday)} />
                                </td>
                                <td>
                                    <button
                                        onClick={event => handleClick(event, user._id)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))

                    }
                </tbody>

            </table>

        </div>

    )
}

export default Table