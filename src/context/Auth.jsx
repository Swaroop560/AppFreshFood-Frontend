import {useState,useContext,createContext} from 'react'

// Creating the Context
const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext)
}

// Creating Provider
export const AuthProvider = ({children}) =>{
    
    const[userName,setUserName] = useState('')
    const[userId,setUserId] = useState('')
    const[code,setCode] = useState('')
    const[isLoggedIn,setIsLoggedIn] = useState(false)

    const login =(uname,uid,usercode) =>{
        setUserName(uname)
        setUserId(uid)
        setCode(usercode)
        setIsLoggedIn(true)
    }

    const logout = () => {
        setUserName('')
        setUserId('')
        setIsLoggedIn(false)
    }

    return(
        <AuthContext.Provider value={{userName,userId,code,login,logout,isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}