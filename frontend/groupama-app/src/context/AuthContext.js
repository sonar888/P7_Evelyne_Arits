import React from "react"

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
    const [authentication, setAuthentication] = React.useState({
        userId: null,
        token: null,
        isAuthenticated: false
    })

    const [refresh, setRefresh] = React.useState(false)
    return (
        <AuthContext.Provider value={{authentication, setAuthentication, refresh, setRefresh}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider