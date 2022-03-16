import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import Table from '../Table/Table'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      fetch(`http://localhost:4000/api/search`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        redirect: 'follow',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          setUserData(data)
        })
    }
    getUsers()
  }, [])

  const handleSearch = (event) => {
    fetch(`http://localhost:4000/api/search?name=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      redirect: 'follow',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        setUserData(data)
      })
    event.preventDefault()
  }
  return (

    <div>
      <div className='home'>
        <form onSubmit={handleSearch}>
          <input
            placeholder='Type username or email'
            name='name'
            onChange={e => setSearch(e.target.value)}
          />
          <button type='Submit'>Search</button>
        </form>

      </div>
      <Table users={userData}>

      </Table>
    </div>
  )
}

export default HomePage