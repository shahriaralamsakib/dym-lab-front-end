import './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email === 'test@test.com' && password === 'admin') {
      setMessage('Login successful!')
      // Redirect to dashboard after login
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/dashboard/home')
    } else {
      setMessage('Invalid email or password.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
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

            <div className="form-group" style={{ position: 'relative' }}>
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '35px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          {message && <p className="login-message">{message}</p>}
        </div>

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
