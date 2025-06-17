import './Login.css'
import React, { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email === 'admin@example.com' && password === 'password123') {
      setMessage('Login successful!')
    } else {
      setMessage('Invalid email or password.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left: Login Form */}
        <div className="login-form-section">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          {message && <p className="login-message">{message}</p>}
        </div>

        {/* Right: Instructions */}
        <div className="instruction-section">
          <h2>Welcome</h2>
          <h3>To</h3>
          <h3>Majeed Agricultural Robotics Lab</h3>
          <ul>
            <li>Use your registered email and password.</li>
            <li>Password is case-sensitive.</li>
            <li>If you forgot your password, contact admin.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
