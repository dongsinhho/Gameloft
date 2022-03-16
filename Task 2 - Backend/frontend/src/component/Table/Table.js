import React from 'react'
import './Table.css'

const Table = ({ users }) => {
    return (
        <div>

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Birthday</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.birthday}</td>
                            </tr>
                        ))

                    }
                </tbody>

            </table>

        </div>

    )
}

export default Table