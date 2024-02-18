import { useState } from "react";

function Registration() {
    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:2001/register', {
      method:'POST',
      headers: {
        'content-type' : 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
    const data = await response.json()
    console.log(data)
  }

  return(
    <>
        <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
      </form>

    </>
  )
}

export default Registration