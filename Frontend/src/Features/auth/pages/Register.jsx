import React, { useState, useEffect } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [showOTP, setShowOTP] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [error, setError] = useState("")
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [focusedField, setFocusedField] = useState(null)

    const { user, loading, handleRegister, handleVerifyOTP } = useAuth()

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

        if (!showOTP) {
            // Registration step
            const success = await handleRegister({ username, email, password })
            if (success) {
                setShowOTP(true)
            } else {
                setError('Could not create account. Please check your data and try again.')
            }
        } else {
            // OTP verification step
            const success = await handleVerifyOTP({ email, otp })
            if (success) {
                navigate("/home")
            } else {
                setError('Invalid OTP. Please check and try again.')
            }
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
                            <h1>{showOTP ? 'Verify Email' : 'Create Account'}</h1>
                            <p>{showOTP ? 'Enter the 6-digit code sent to your email' : 'Join us and start your journey'}</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {error && <div className="form-error" style={{color: '#ff7373', marginBottom: '0.75rem'}}>{error}</div>}

                            {!showOTP ? (
                                <>
                                    <div className="input-group">
                                        <label htmlFor="username">Username</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">👤</span>
                                            <input
                                                onChange={(e) => { setUsername(e.target.value) }}
                                                onFocus={() => setFocusedField('username')}
                                                onBlur={() => setFocusedField(null)}
                                                type="text"
                                                id="username"
                                                name='username'
                                                placeholder='Enter username'
                                                className={focusedField === 'username' ? 'focused' : ''}
                                            />
                                            <div className="input-glow"></div>
                                        </div>
                                    </div>

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
                                        <span>Create Account</span>
                                        <span className="btn-glow"></span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="input-group">
                                        <label htmlFor="otp">Verification Code</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">🔢</span>
                                            <input
                                                onChange={(e) => { setOtp(e.target.value) }}
                                                onFocus={() => setFocusedField('otp')}
                                                onBlur={() => setFocusedField(null)}
                                                type="text"
                                                id="otp"
                                                name='otp'
                                                placeholder='Enter 6-digit code'
                                                maxLength="6"
                                                className={focusedField === 'otp' ? 'focused' : ''}
                                            />
                                            <div className="input-glow"></div>
                                        </div>
                                    </div>

                                    <button className='button primary-button login-btn'>
                                        <span>Verify Email</span>
                                        <span className="btn-glow"></span>
                                    </button>
                                </>
                            )}
                        </form>

                        <div className="footer-section">
                            {!showOTP ? (
                                <p>Already have an account? <Link to={"/login"}>Sign in</Link></p>
                            ) : (
                                <p>Didn't receive the code? <button onClick={() => setShowOTP(false)} style={{background: 'none', border: 'none', color: '#6a82fb', cursor: 'pointer', textDecoration: 'underline'}}>Try again</button></p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Light reflection effect */}
                <div className="light-reflection"></div>
            </div>
        </main>
    )
}

export default Register