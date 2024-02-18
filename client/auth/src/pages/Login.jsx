import { useState } from "react";

function Login() {

  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  
  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:2001/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json()
    if(data.user){
      alert("login successful")
      window.Location.href = '/register'
    }else{
      alert("please check your credentials")
    }
    
  }
  return (
    <>
      <form onSubmit={handleLogin}>
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
        <input type="submit" value="login" />
      </form>
    </>
  );
}

export default Login;
