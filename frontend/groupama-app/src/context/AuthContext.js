import React from "react"

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
    const [authentication, setAuthentication] = React.useState({
        userId: null,
        token: null,
        isAuthenticated: false
    })

    return (
        <AuthContext.Provider value={{authentication, setAuthentication}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider