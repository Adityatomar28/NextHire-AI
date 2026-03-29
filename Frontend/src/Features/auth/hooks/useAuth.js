import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe, verifyOTP } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setUser(data.user)
                return true
            }
            return false
        } catch (err) {
            console.error('Login failed', err)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
                return true
            }
            return false
        } catch (err) {
            console.error('Register failed', err)
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async ({ email, otp }) => {
        setLoading(true)
        try {
            const data = await verifyOTP({ email, otp })
            if (data && data.user) {
                setUser(data.user)
                return true
            }
            return false
        } catch (err) {
            console.error('OTP verification failed', err)
            return false
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                setUser(data.user)
            } catch (err) { } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout, handleVerifyOTP }
}