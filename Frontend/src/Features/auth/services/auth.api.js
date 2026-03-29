import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        console.log(err)

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function verifyOTP({ email, otp }) {

    try {
        const response = await api.post('/api/auth/verify-otp', {
            email, otp
        })

        return response.data

    } catch (err) {
        console.log(err)
    }

}

// export async function register({username,email,password}){
//     try {
//         const response = await axios.post('https://localhost:3000/api/auth/register',{
//             username,email,password
//         },{
//             withCredentials:true
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
// }


// export async function login({email,password}){
//     try {
//         const response = await axios.post("https://localhost:3000/api/auth/login",{
//             email,password
//         },{
//         withCredentials:true
//         })
//         return response.data
//     } catch (err) {
//          console.log(err)
//     }
// }


// export async function logout(){
//     try {
//         const response = await axios.get("https://localhost:3000/api/auth/logout",{
//         },{
//         withCredentials:true
//         })
//         return response.data
//     } catch (err) {
//          console.log(err)
//     }
// }


// export async function getMe(){
//     try {
//         const response = await axios.get("https://localhost:3000/api/auth/get-me",{
//         withCredentials:true
//         })
//         return response.data
//     } catch (err) {
//         console.log(err)
//     }
// }