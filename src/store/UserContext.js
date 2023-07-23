import {useState , createContext} from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    const [userInfo , setUserInfo] = useState(null)
    return (
        <UserContext.Provider value={{userInfo , setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}
