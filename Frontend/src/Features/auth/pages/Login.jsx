import React, { useState, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, user, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [darkMode, setDarkMode] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [focusedField, setFocusedField] = useState(null)

    // Load dark mode preference from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            setDarkMode(true)
            document.documentElement.setAttribute('data-theme', 'dark')
        }
    }, [])

    // Handle mouse move for 3D tilt effect
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
    }

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)
        if (newDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.removeAttribute('data-theme')
            localStorage.setItem('theme', 'light')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const success = await handleLogin({ email, password })
        if (success) {
            navigate('/home')
        } else {
            setError('Invalid email or password. Please try again.')
        }
    }

    if (user) {
        return <Navigate to='/home' replace />
    }

    if (loading) {
        return <main><h1>Loading.......</h1></main>
    }

    const rotateX = (mousePosition.y - 0.5) * 5
    const rotateY = (mousePosition.x - 0.5) * -5

    return (
        <main className={`auth-main ${darkMode ? 'dark' : 'light'}`}>
            {/* Theme Toggle Button */}
            <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Dark/Light Mode">
                {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Animated Background Elements */}
            <div className="bg-orbs"></div>

            {/* 3D Card Container */}
            <div 
                className="form-wrapper"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
                style={{
                    perspective: '1000px'
                }}
            >
                <div 
                    className="form-container-3d"
                    style={{
                        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    {/* Glass Effect Background */}
                    <div className="glass-bg"></div>

                    {/* Content */}
                    <div className="form-content">
                        <div className="header-section">
                            <h1>Welcome Back</h1>
                            <p>Sign in to your account</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {error && <div className="form-error" style={{color: '#ff7373', marginBottom: '0.75rem'}}>{error}</div>}
                            <div className="input-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">✉️</span>
                                    <input
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        type="email"
                                        id="email"
                                        name='email'
                                        placeholder='Enter email address'
                                        className={focusedField === 'email' ? 'focused' : ''}
                                    />
                                    <div className="input-glow"></div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🔒</span>
                                    <input
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        type="password"
                                        id="password"
                                        name='password'
                                        placeholder='Enter password'
                                        className={focusedField === 'password' ? 'focused' : ''}
                                    />
                                    <div className="input-glow"></div>
                                </div>
                            </div>

                            <button className='button primary-button login-btn'>
                                <span>Sign In</span>
                                <span className="btn-glow"></span>
                            </button>
                        </form>

                        <div className="footer-section">
                            <p>Don't have an account? <Link to={"/register"}>Create one</Link></p>
                        </div>
                    </div>
                </div>

                {/* Light reflection effect */}
                <div className="light-reflection"></div>
            </div>
        </main>
    )
}

export default Login